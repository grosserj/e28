<template>
  <b-row class='justify-content-md-center'>
    <b-col cols='6' class='text-left'>
      <b-form @submit='addNewCard' v-if='show'>
        <!-- Category-Select -->
        <b-form-group id='input-group-1' label='Existing Categories:' label-for='input-1'>
          <b-form-select id='input-1' v-model='selectCategory' :options='categoryNames' required></b-form-select>
        </b-form-group>

        <!-- Category-NewName -->
        <div v-if='selectCategory=="Create New Category"'>
          <b-form-group id='newCat-group-1' label='Name of new Category:' label-for='newCat-1'>
            <b-form-input
              id='newCat-1'
              v-model='$v.form.name.$model'
              :class='{ "form-input-error": $v.form.name.$error, "form-input-valid": !$v.form.name.$invalid }'
              placeholder='Ex. The name of my new category'
            ></b-form-input>
            <div v-if='$v.form.name.$error' class='form-feedback-error'>
              <div v-if='!$v.form.name.required'>Category name is required.</div>

              <div
                v-if='!$v.form.name.minLength'
              >Category name must be at least {{ $v.form.name.$params.minLength.min }} characters long.</div>
            </div>
          </b-form-group>

          <!-- Category-Description -->
          <b-form-group id='newCat-group-2' label='Category Description:' label-for='newCat-2'>
            <b-form-input
              id='newCat-2'
              v-model='$v.form.description.$model'
              :class='{ "form-input-error": $v.form.description.$error, "form-input-valid": !$v.form.description.$invalid }'
              placeholder='Ex. Flashcards in the "   " category'
            ></b-form-input>
          </b-form-group>

          <!-- Category-Difficulty -->
          <b-form-group id='newCat-group-3' label='Category Difficulty:' label-for='newCat-3'>
            <b-form-input
              id='newCat-3'
              v-model='$v.form.difficulty.$model'
              :class='{ "form-input-error": $v.form.difficulty.$error, "form-input-valid": !$v.form.difficulty.$invalid }'
              placeholder='Ex. 3'
            ></b-form-input>
            <div
              v-if='!$v.form.difficulty.integer'
              class='form-feedback-error'
            >Difficulty must be an integer</div>
          </b-form-group>
        </div>

        <!-- Card-Question -->
        <div v-if='selectCategory'>
          <b-form-group id='input-group-2' label='Flashcard Question:' label-for='input-2'>
            <b-form-input
              id='input-2'
              v-model='$v.question.$model'
              :class='{ "form-input-error": $v.question.$error, "form-input-valid": !$v.question.$invalid }'
              placeholder='Ex. How much wood could a wood chuck chuck?'
            ></b-form-input>
          </b-form-group>

          <!-- Card-Answer -->
          <b-form-group id='input-group-3' label='Flashcard Answer:' label-for='input-3'>
            <b-form-input
              id='input-3'
              v-model='$v.answer.$model'
              :class='{ "form-input-error": $v.answer.$error, "form-input-valid": !$v.answer.$invalid }'
              placeholder='Ex. 21 parcels'
            ></b-form-input>
          </b-form-group>

          <b-button type='submit' @click.prevent='addNewCard' variant='primary'>Create card</b-button>

          <div class='form-feedback-error' v-if='$v.$anyError'>Please correct the above errors</div>
        </div>
      </b-form>

      <transition name='fade' mode='out-in'>
        <b-alert
          show
          data-test='product-added-confirmation'
          variant='success'
          v-if='added'
        >{{ message}}</b-alert>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import * as app from '@/common/app.js';
import { required, minLength, integer } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      added: false,
      selectCategory: null,
      question: '',
      answer: '',
      form: {
        name: '',
        description: '',
        difficulty: ''
      },
      show: true,
      message: '',
      lastMessage: ''
    };
  },
  methods: {
    addNewCard() {
      this.$v.$touch();

      if (!this.$v.$anyError) {
        // create new category with a new card
        if (this.selectCategory == 'Create New Category') {
          app.api.add('categories', this.form2).then(id => {
            console.log('Category was added with the id: ' + id);
          });

          this.message = 'New Category and Card added!';
          this.$store.dispatch('setCategories');
        }
        // add card to existing category
        else {
          let data = { answer: this.answer, question: this.question };

          app.api
            .get_id_name('categories', 'name', this.selectCategory)
            .then(response => {
              app.api.addCard('categories', Object.values(response)[0], data);
            });

          this.message = 'Card added to ' + this.selectCategory;
        }

        this.$v.$reset();
        this.added = true;
        setTimeout(() => (this.added = false), 3000);

        (this.answer = ''), (this.question = '');
        this.form = {
          name: '',
          description: '',
          difficulty: ''
        };
      }
    }
  },
  computed: {
    // list of all categories, used for drop down menu
    categories() {
      return this.$store.state.categories;
    },
    categoryNames: function() {
      if (this.categories) {
        let tempNames = [{ text: 'Select One', value: null }];
        tempNames.push('Create New Category');
        for (let x of Object.keys(this.categories)) {
          tempNames.push(this.categories[x].name);
        }
        return tempNames;
      } else {
        return [{ text: 'Loading...', value: null }];
      }
    },
    // create slug format using name of new category
    categorySlug() {
      // src: https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case
      return this.form.name.replace(/\s+/g, '-').toLowerCase();
    },
    form2() {
      return {
        name: this.form.name,
        description: this.form.description,
        difficulty: this.form.difficulty,
        cards: [{ answer: this.answer, question: this.question }],
        slug: this.categorySlug
      };
    }
  },
  validations() {
    if (this.selectCategory == 'Create New Category') {
      return {
        form: {
          name: { required, minLength: minLength(5) },
          description: { required },
          difficulty: { required, integer }
        },
        question: { required },
        answer: { required }
      };
    } else {
      return {
        question: { required },
        answer: { required }
      };
    }
  }
};
</script>

<style scoped>
</style>
