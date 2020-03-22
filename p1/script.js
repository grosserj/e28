
Vue.component('round-history', {
    props: ['status', 'guessesRemaining', 'difficulty', 'mysteryWord'],
    template:
        `
    <div>
        <span v-if='status == 1'>
            Player Won! Guessed <b>{{ mysteryWord }}</b> with <b>{{ guessesRemaining }}</b> 
            <span v-if='guessesRemaining === 1'>guess remaining</span>
            <span v-else>guesses remaining</span>
        </span>
        <div v-else>
            Player lost on word: <b>{{ mysteryWord }}</b>
        </div>
    </div>
    `

});

Vue.component('user-feedback', {
    props: ['correctLetters', 'gameStatus'],
    template:
        `
    <div>
        <div v-if='gameStatus != null' :class='{green: gameStatus, red: !gameStatus}' class='banner'>
            <div v-if='gameStatus === 1'>
                You Won!
            </div>
            <div v-else>
                You Lost :(
            </div>
            <button @click="$emit('new-game')">Play Again?</button>
        </div>
        <div v-else-if='correctLetters !=null'>
            <div v-if='correctLetters === 1'>
                You guessed {{ correctLetters }} letter correctly!
            </div>
            <div v-else-if='correctLetters > 1'>
                You guessed {{ correctLetters }} letters correctly!
            </div>
            <div v-else>
                None of the letters you guessed revealed any more hidden letters
            </div>
        </div>
    </div>
    `
});

FileReader

// The Vue instance
let app = new Vue({
    // Options

    el: '#app', // reference element in DOM with tag 'app'

    data: {
        'wordsToGuess': [
            "horse",
            "kangaroo",
            "kitten",
            "lion",
            "lobster",
            "monkey",
            "octopus",
            "panda",
            "puppy",
            "rabbit",
            "scorpion",
            "seal",
            "shark",
            "sheep",
            "snail",
            "snake",
            "spider",
            "squirrel",
            "tiger",
            "turtle",
            "wolf",
            "zebra"], // word list
        rounds: [],
        roundsWon: 0,
        mysteryWord: null,
        hiddenWord: null,
        lastWord: null, // previous word provided to user in game
        guessesStart: 6,
        guessesRemaining: null,
        guessL: "",
        guessW: "",
        correctLetterCount: null,
        gameStatus: null, // lost or won
    },
    // pick and hide first word during Vue.js mount
    mounted: function () {
        this.guessesRemaining = this.guessesStart;
        this.generateWord(); //call function to generate first mystery word
        this.hideWord(); // call function at startup to hide first mystery word
    },
    methods: {
        hideWord: function () {
            let reg = new RegExp(/./g);
            this.hiddenWord = this.mysteryWord.replace(reg, "-"); // replace letters with dashes
        },
        generateWord: function () {
            // to make sure that the new word is not the same as the last one
            // loop until a new word is selected
            // src: https://github.com/susanBuck/e28-spring20/issues/23
            while (this.mysteryWord === this.lastWord) {
                let index = Math.round(Math.random() * (this.wordsToGuess.length - 1));
                this.mysteryWord = this.wordsToGuess[index];
            }
            // set what the new lastWord is
            this.lastWord = this.mysteryWord;
        },
        // function takes player's letter guess and reveals matching letter in mystery word
        guessLetter: function () {
            if (this.guessL != "") {
                // find where the occurances of the guessed letter appear in the mystery word
                let indexL = [];
                for (let i = 0; i < this.mysteryWord.length; i++) {
                    if (this.mysteryWord[i] === this.guessL.toLowerCase()) indexL.push(i);
                }

                this.correctLetterCount = 0;
                this.hiddenWord = [...this.hiddenWord]; // convert string to array so it can be indexed
                // for all occurances of the letter in the mystery word, replace "-" with the letter
                for (let i = 0; i < indexL.length; i++) {
                    if (this.hiddenWord[indexL[i]] == "-") { this.correctLetterCount++ }
                    this.hiddenWord[indexL[i]] = this.guessL.toLowerCase();
                }
                this.hiddenWord = this.hiddenWord.join(''); // convert back to string


                if (this.hiddenWord === this.mysteryWord) {
                    this.gameStatus = 1; // victory
                    this.roundsWon++;
                }
                this.updateGuessCount();

                this.guessL = ""; // clear the input text
            };
        },
        guessWord: function () {
            if (this.guessW.toLowerCase() == this.mysteryWord) {
                this.hiddenWord = this.mysteryWord;
                this.gameStatus = 1; // victory
                this.roundsWon++;
            }
            this.updateGuessCount();
            this.guessW = ""; // clear input box
        },

        // called whenever the player guesses a letter or word via
        // guessWord() or guessLetter()
        updateGuessCount: function () {
            this.guessesRemaining -= 1; // update guess count
            if (this.guessesRemaining === 0 && this.gameStatus != 1) {
                this.gameStatus = 0; // lost :(
            }
        },

        // function called to initiate a new game
        newGame: function () {
            this.rounds.push({ word: this.mysteryWord, remaining: this.guessesRemaining, status: this.gameStatus });
            this.gameStatus = null;
            this.correctLetterCount = null;
            this.guessesRemaining = this.guessesStart;
            this.generateWord(); //call function to generate next mystery word
            this.hideWord(); // call function at startup to hide next mystery word
        },
        resetHistory: function () {
            this.roundsWon = 0;
            this.rounds = [];
        },
    },
    computed: {
        roundsLost: function () {
            return this.rounds.length - this.roundsWon;
        },
    },
});
