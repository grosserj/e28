<template>
  <b-row class='justify-content-md-center'>
    <b-col cols='6' class='text-left'>
      <b-form @submit='addNewCard' v-if='show'>
        <b-form-group id='input-group-1' label='Existing Categories:' label-for='input-1'>
          <b-form-select id='input-1' v-model='selectCategory' :options='categoryNames' required></b-form-select>
        </b-form-group>

        <div v-if='selectCategory=="Create New Category"'>
          <b-form-group id='newCat-group-1' label='Name of new Category:' label-for='newCat-1'>
            <b-form-input
              id='newCat-1'
              v-model='form.name'
              placeholder='Ex. The name of my new category'
            ></b-form-input>
          </b-form-group>

          <b-form-group id='newCat-group-2' label='Category Description:' label-for='newCat-2'>
            <b-form-input
              id='newCat-2'
              v-model='form.description'
              placeholder='Ex. Flashcards in the "   " category'
            ></b-form-input>
          </b-form-group>

          <b-form-group id='newCat-group-3' label='Category Difficulty:' label-for='newCat-3'>
            <b-form-input id='newCat-3' v-model='form.difficulty' placeholder='Ex. 3'></b-form-input>
          </b-form-group>
        </div>

        <div v-if='selectCategory'>
          <b-form-group id='input-group-2' label='Flashcard Question:' label-for='input-2'>
            <b-form-input
              id='input-2'
              v-model='question'
              required
              placeholder='Ex. How much wood could a wood chuck chuck?'
            ></b-form-input>
          </b-form-group>

          <b-form-group id='input-group-3' label='Flashcard Answer:' label-for='input-3'>
            <b-form-input id='input-3' v-model='answer' required placeholder='Ex. 21 parcels'></b-form-input>
          </b-form-group>

          <b-button type='submit' @click.prevent='addNewCard' variant='primary'>Create card</b-button>
        </div>
      </b-form>

      <show-alert v-if='message' :message='message'></show-alert>
    </b-col>
  </b-row>
</template>

<script>
import * as app from '@/common/app.js';
import ShowAlert from '@/components/ShowAlert.vue';

export default {
  mounted: function() {
    app.api.all('categories').then(response => {
      this.categories = response;
    });
  },
  components: {
    'show-alert': ShowAlert
  },
  data() {
    return {
      categories: null,
      selectCategory: null,
      categoryName: '',
      question: '',
      answer: '',
      form: {
        name: '',
        description: '',
        difficulty: '',
        cards: [{ answer: this.answer, question: this.question }],
        slug: this.categorySlug
      },
      show: true,
      message: '',
      lastMessage: ''
    };
  },
  methods: {
    addNewCard() {
      // create new category with a new card
      if (this.selectCategory == 'Create New Category') {
        app.api.add('categories', this.form).then(id => {
          console.log('Category was added with the id: ' + id);
        });

        this.message = 'New Category and Card added!';
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

      // adding a space to current message, in order to send a
      // unique message to alert to trigger it, a bit hackish...
      if (this.lastMessage == this.message) {
        this.message = this.message + ' ';
      }
      this.lastMessage = this.message;

      (this.answer = ''), (this.question = '');
      this.form = {
        name: '',
        description: '',
        difficulty: '',
        cards: [{ answer: this.answer, question: this.question }],
        slug: this.categorySlug
      };
    }
  },
  computed: {
    // list of all categories, used for drop down menu
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
    }
  }
};
</script>

<style scoped>
</style>
