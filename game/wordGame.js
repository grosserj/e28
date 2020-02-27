
// startup
mysteryWord = chooseWord(); // get mysteryWord from list
// console.log(mysteryWord);


let reg = new RegExp(/./g);
let hiddenWord = mysteryWord.replace(reg, "-"); // replace letters with dashes


document.getElementById('word').innerText = hiddenWord; // set hiddenWord in html


// function takes player's letter guess and reveals matching letter in mystery word
function guessLetter() {
    guessL = document.getElementById('letterIn').value.toLowerCase();

    // find where the occurances of the guessed letter appear in the mystery word
    indexL = [];
    for (var i = 0; i < mysteryWord.length; i++) {
        if (mysteryWord[i] === guessL) indexL.push(i);
    }


    hiddenWord = [...hiddenWord]; // convert string to array so it can be indexed
    // for all occurances of the letter in the mystery word, replace "-" with the letter
    for (var i = 0; i < indexL.length; i++) {
        hiddenWord[indexL[i]] = guessL;
    }

    hiddenWord = hiddenWord.join(''); // convert back to string

    document.getElementById('word').innerText = hiddenWord; // update html with new hiddenWord

    updateGuessCount();
}


// function when player attempts to guess the whole word
function guessWord() {

    guessW = document.getElementById('wordIn').value.toLowerCase();

    found = guessW.match(mysteryWord);
    if (found !== null) {
        hiddenWord = mysteryWord;
        document.getElementById('word').innerText = hiddenWord;
    }

    updateGuessCount();
}

// checks to see if player has won, lost, or updates the guess count
function updateGuessCount() {
    guessCount = document.getElementById('guesses').innerText;

    if (hiddenWord === mysteryWord) {
        document.getElementById('guessesPara').innerHTML = "You Win!"
    }
    else if (guessCount - 1 > 0) { // decrease guess count by 1
        document.getElementById('guesses').innerText = guessCount - 1;
    }
    else { // out of guesses, player lost
        document.getElementById('guessesPara').innerHTML = "You Lost :(";
        document.getElementById('guesses').innerText = guessCount - 1;
    }

}

// function returns a random word from the list below
function chooseWord() {

    let wordList = new Array(
        "alligator",
        "bear",
        "bee",
        "bird",
        "camel",
        "cheetah",
        "chicken",
        "chimpanzee",
        "crocodile",
        "deer",
        "dolphin",
        "duck",
        "eagle",
        "elephant",
        "frog",
        "giraffe",
        "goat",
        "goldfish",
        "hamster",
        "hippopotamus",
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
        "zebra");

    return mysteryWord = wordList[Math.floor(Math.random() * wordList.length + 1)];

}