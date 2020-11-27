const compare = function(word, guess) {
   word = word.toLowerCase().split('').sort().join('');
   guess = guess.toLowerCase().split('').sort().join('');

   let matchCount = 0, wordIndex = 0, guessIndex = 0;
   while(wordIndex < word.length && guessIndex < guess.length) {
       if (word[wordIndex] === guess[guessIndex]) {
           matchCount++;
           wordIndex++;
           guessIndex++;
       } else if (word[wordIndex] < guess[guessIndex]) {
           wordIndex++;
       } else {
           guessIndex++;
       }
   }

   return matchCount;
};

module.exports = compare;