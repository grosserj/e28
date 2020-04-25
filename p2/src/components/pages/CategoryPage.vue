<template>
  <b-container v-if='category' id='category-page'>
    <b-row align-h='end'>
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

    <b-alert
      :show='dismissCountDown'
      v-if='status=="correct!"'
      fade
      variant='success'
      @dismiss-count-down='countDownChanged'
    >Success Correct 100% Wow! Superb</b-alert>
    <b-alert
      :show='dismissCountDown'
      v-else-if='status=="incorrect"'
      fade
      variant='danger'
      @dismiss-count-down='countDownChanged'
    >Incorrect, try again!</b-alert>
  </b-container>
</template>

<script>
import * as app from '@/common/app.js';
export default {
  props: ['slug'],
  data: function() {
    return {
      category: [],
      currentCard: null,
      currentSide: 'question',
      currentMode: 'quiz',
      answerAttempt: '',
      status: 'guessing',
      dismissSecs: 2,
      dismissCountDown: 0,
      lastWord: null,
      options: [
        { text: 'Quiz Mode', value: 'quiz' },
        { text: 'Study Mode', value: 'study' }
      ]
    };
  },
  mounted: function() {
    // use slug to pull corrolates category from firebase
    app.api.get_slug('categories', this.slug).then(response => {
      this.category = response;
      this.randomCard();
    });
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
            Math.floor(Math.random() * this.category.cards.length + 1)
          ];
        } else {
          while (this.currentCard.question === this.lastWord) {
            this.currentCard = this.category.cards[
              Math.floor(Math.random() * this.category.cards.length + 1)
            ];
          }
        }
      }
      this.lastWord = this.currentCard.question;
      this.currentSide = 'question';
    },
    checkAnswer() {
      if (
        this.answerAttempt.toLowerCase() ===
        this.currentCard.answer.toLowerCase()
      ) {
        this.status = 'correct!';
        this.showAlert();
        this.randomCard();
      } else {
        this.status = 'incorrect';
        this.showAlert();
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
    },
    // used for the timed alert message
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style scoped>
</style>