import UserFeedback from './Components/UserFeedback.vue'
import Vue from 'vue';

// The Vue instance
let app = new Vue({
    // Options

    // PLAY AGAIN button resets the game without refreshing the page
    // feedback styling must be use v-bind on an object
    // same word can not be used twice in a row

    el: '#app', // reference element in DOM with tag 'app'

    components: {
        'user-feedback': UserFeedback,
    },

    data: {
        playerName: null,
        word: null,
        lastWord: null,
        guess: null,
        victory: 0,
        guessed: false,
        words: [
            ['apple', 'Sometimes red, sometimes delicious'],
            ['washington', 'Rushmore’s left edge'],
            ['pumpkin', 'Halloween’s favorite fruit'],
            ['football', 'Play with your hands or feet, depending on your location']
        ]
    },
    methods: {
        scrambleWord: function () {
            if (this.playerName) {
                // random number between 0 and length of words
                let index = Math.round(Math.random() * (this.words.length - 1));
                this.word = this.words[index];
                // to make sure that the new word is not the same as the last one
                // loop until a new word is selected
                // src: https://github.com/susanBuck/e28-spring20/issues/23
                while (this.word === this.lastWord) {
                    index = Math.round(Math.random() * (this.words.length - 1));
                    this.word = this.words[index];
                }
                // set what the new lastWord is
                this.lastWord = this.word;
            }
        },
        checkGuess: function () {

            this.guessed = true;
            if (this.word[0] == this.guess) {
                // yay you won
                // display the green banner
                this.victory = true;
            }
            else {
                // display the red banner
                this.victory = false;
            }
            // clear the guess
            this.guess = null;
        },

        resetGame: function () {
            this.guessed = false;
            this.victory = 0;
            this.scrambleWord();
        }

    },
    computed: {
        // word must be scrambled here
        // src https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
        scrambledWord: function () {
            if (this.word != null) {
                let tScrambledWord = '';
                let tempWord = this.word[0];
                tempWord = tempWord.split('');
                while (tempWord.length > 0) {
                    tScrambledWord += tempWord.splice(tempWord.length * Math.random() << 0, 1);
                }
                return tScrambledWord;
            }
        }
    },
});
