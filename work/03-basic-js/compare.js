"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY THIS LINE

  /* YOU MAY MODIFY THE LINES BELOW */

  // Turn all letters to uppercase
  const upperWord = word.toUpperCase();
  const upperGuess = guess.toUpperCase();

  // Count each letter's frequencies in the upperWord
  const wordLetters = {};
  for (const letter of upperWord) {
    if (!wordLetters[letter]) {
      wordLetters[letter] = 0;
    }
    wordLetters[letter]++;
  }

  // Count each letter's frequencies in the upperGuess
  const guessLetters = {};
  for (const letter of upperGuess) {
    if (!guessLetters[letter]) {
      guessLetters[letter] = 0;
    }
    guessLetters[letter]++;
  }

  // Sum up the number of same letters between two words
  let sameLetters = 0;
  for (const letter in wordLetters) {
    if (guessLetters[letter]) {
      sameLetters += Math.min(wordLetters[letter], guessLetters[letter]);
    }
  }

  return sameLetters;
}
