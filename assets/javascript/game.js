/*
 * Author: Suki Sahota
 * Description: Hangman style Word Guess Game
 */
window.onload = function() {

  //GLOBAL VARIABLES
  //===========================================================
  //wordBank array to hold potential words
  const wordBank = ["aquafina", "fiji", "smart", "dasani", "vitamin", "sparkling",
                  "tap", "mineral", "rain", "fresh", "salt", "potable"];

  //randomly chosen word
  let word = "";
  //array to individually hold chosen word's letters
  let wordLetters = [];
  //length of wordLetters array
  let wordLength = 0;
  //array comprised of underscores and correctly guessed letters
  let wordDisplay = [];
  //array to hold incorrectly guessed letters
  let wrongGuesses = [];
  //user's character guess
  let letterGuessed = "";
  let letterInWord = false;
  //number of user's 'lives' or 'guesses' remaining for current word
  let guessesRemaining = 0;

  //win/loss variables to track game statistics
  let wins = 0;
  let losses = 0;


  //START GAME FUNCTION
  //===========================================================
  function startGame() {
    //select word at random index from wordBank array
    word = wordBank[Math.floor(Math.random() * wordBank.length)];
    //string to array
    wordLetters = word.split("");
    wordLength = wordLetters.length;

    //prepare wordDisplay array to be filled with underscores
    wordDisplay = [];
    //push appropriate number of underscores into wordDisplay array
    for (let i = 0; i < wordLength; i++) {
      wordDisplay.push("_");
    }
    //display wordDisplay array to user with appropriate number of underscores
    document.getElementById("word-text").innerHTML = wordDisplay.join(" ");

    //reset values for brand new game
    guessesRemaining = 9;
    //display the newly reset guessesRemaining value on document
    document.getElementById("guesses-remaining-text").innerHTML = guessesRemaining;

    wrongGuesses = [];
    //clear the incorrect guesses from previous round
    document.getElementById("guessed-letters-text").innerHTML = wrongGuesses.join(" ");
  }


  //CHECK LETTERS FUNCTION
  //===========================================================
  function checkLetters(letter) {
    letterInWord = false;
    //loop through word
    for (let i = 0; i < wordLength; i++) {
      //check if guess is correct
      if (word[i] === letter) {
        //flip boolean to true with correct guess
        letterInWord = true;
        //replace underscore with correctly guessed letter
        wordDisplay[i] = letter;
      }
    }

    //if guess is incorrect, add guessed letter to wrongGuesses array and decrement guessesRemaining
    if (!letterInWord) {
      wrongGuesses.push(letter);
      guessesRemaining--;
    }
  }


  //ROUND COMPLETE FUNCTION
  //===========================================================
  function roundComplete() {
    //display user updated guessesRemaining
    document.getElementById("guesses-remaining-text").innerHTML = guessesRemaining;

    //display user updated wordDisplay array with underscores and correct guesses
    document.getElementById("word-text").innerHTML = wordDisplay.join(" ");

    //show updated array with all wrongGuesses from the current word
    document.getElementById("guessed-letters-text").innerHTML = wrongGuesses.join(" ");

    //if user correctly guesses the word, she wins
    if (wordDisplay.toString() === wordLetters.toString() && guessesRemaining > 0) {
      //increment wins counter
      wins++;
      //display updated wins to user on HTML
      document.getElementById("wins-text").innerHTML = wins;
      alert("Winner winner, chicken dinner!");
      //start new game
      startGame();
    }

    //if user runs out of lives before guessing the word, she loses
    else if (guessesRemaining === 0) {
      //decrement losses counter
      losses++;
      //display updated losses to the user on HTML
      document.getElementById("losses-text").innerHTML = losses;
      alert("I'm sorry, you lost this time. Please try again if you want to win!");
      //start new game
      startGame();
    }
  }


  //INITIALIZE GAME READY FOR USE
  //===========================================================
  startGame();


  //ROUND BEGINS ON EACH KEY UP
  //===========================================================
  document.onkeyup = function(event) {
    letterGuessed = String.fromCharCode(event.which).toLowerCase();
    for (let i = 0; i < wrongGuesses.length; i++) {
      if (wrongGuesses[i] === letterGuessed) {
        return;
      }
    }
    checkLetters(letterGuessed);
    roundComplete();
  };
}