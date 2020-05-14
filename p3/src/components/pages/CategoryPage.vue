<template>
  <b-container v-if='category' id='category-page'>
    <b-row align-h='end' data-test2='page-row'>
      <b-col cols='8'>
        <h2>{{ category.name }}</h2>
        <div class='description'>{{ category.description }}</div>
        <div class='difficulty'>
          Difficulty:
          <b>{{ category.difficulty }}</b>
        </div>
      </b-col>
      <b-col cols='2'>
        <b-form-group class='text-right'>
          <b-form-radio-group
            data-test='type-radio-buttons'
            id='radio-group-1'
            v-model='currentMode'
            :options='options'
            name='radio-options'
            stacked
            buttons
            button-variant='outline-primary'
          ></b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-card
      v-if='currentCard && currentSide == "question"'
      title='Question:'
      style='min-width: 20rem; max-width: 200rem'
      class='mx-auto currentCard'
      align='left'
    >
      <b-card-text class='currentCardText'>{{ currentCard.question }}</b-card-text>
      <b-card-footer footer-bg-variant='white'>
        <b-row align-v='center'>
          <b-col v-if='currentMode=="quiz"'>
            Answer:
            <input type='text' v-model.trim='answerAttempt' @keydown.enter='checkAnswer' />
            <b-button @click='checkAnswer' class='button' variant='outline-primary'>Submit</b-button>
          </b-col>
          <b-col v-else>
            <b-button @click='randomCard' class='button' variant='outline-primary'>Next Question</b-button>
          </b-col>
          <b-col class='text-right'>
            <b-button @click='seeAnswer' class='button' variant='outline-primary'>See Answer</b-button>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
    <b-card
      v-if='currentCard && currentSide == "answer"'
      title='Answer:'
      style='min-width: 20rem; max-width: 200rem'
      class='mx-auto currentCard'
      align='left'
    >
      <b-card-text class='currentCardText'>{{ currentCard.answer }}</b-card-text>
      <b-card-footer footer-bg-variant='white'>
        <b-row>
          <b-col>
            <b-button @click='randomCard' class='button' variant='outline-primary'>Next Question</b-button>
          </b-col>
          <b-col v-if='currentMode=="study"' class='text-right'>
            <b-button @click='seeAnswer' class='button' variant='outline-primary'>See Question</b-button>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>

    <transition name='fade' mode='out-in' v-if='showAlert'>
      <b-alert show v-if='status=="correct!"' variant='success'>Success Correct 100% Wow! Superb</b-alert>
      <b-alert show v-else-if='status=="incorrect"' variant='danger'>Incorrect, try again!</b-alert>
    </transition>

    <b-button
      data-test='load-card-button'
      @click='randomCard'
      v-if='!currentCard'
      variant='primary'
    >Load First Card</b-button>
  </b-container>
</template>

<script>
// import * as app from '@/common/app.js';
export default {
  props: ['slug'],
  computed: {
    category: function() {
      return this.$store.getters.getCategoryBySlug(this.slug);
    }
  },
  data: function() {
    return {
      showAlert: false,
      currentCard: null,
      currentSide: 'question',
      currentMode: 'quiz',
      answerAttempt: '',
      status: 'guessing',
      lastWord: null,
      options: [
        { text: 'Quiz Mode', value: 'quiz' },
        { text: 'Study Mode', value: 'study' }
      ]
    };
  },
  mounted() {
    this.randomCard();
  },
  methods: {
    randomCard() {
      // picks a random card from the array
      // if there is more than 1 card, make sure that the same card is not pulled twice in a row
      if (this.category.cards.length == 1) {
        this.currentCard = this.category.cards[0];
      } else {
        if (this.currentCard == null) {
          this.currentCard = this.category.cards[
            Math.floor(Math.random() * this.category.cards.length)
          ];
        } else {
          while (this.currentCard.question === this.lastWord) {
            this.currentCard = this.category.cards[
              Math.floor(Math.random() * this.category.cards.length)
            ];
          }
        }
      }
      this.lastWord = this.currentCard.question;
      this.currentSide = 'question';
    },
    checkAnswer() {
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 3000);

      if (
        this.answerAttempt.toLowerCase() ===
        this.currentCard.answer.toLowerCase()
      ) {
        this.status = 'correct!';
        this.randomCard();
      } else {
        this.status = 'incorrect';
      }
      this.answerAttempt = '';
    },
    seeAnswer() {
      if (this.currentSide == 'question') {
        this.currentSide = 'answer';
      } else {
        this.currentSide = 'question';
        if (this.category.type == 'quiz') {
          this.randomCard();
        }
      }
    }
  }
};
</script>

<style scoped>
</style>