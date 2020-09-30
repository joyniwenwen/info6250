"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
	if (!word || !guess) {
		return null;
	}

	if (word.length !== guess.length) {
		return null;
	}

	const wordLowerCase = word.toLowerCase();
	let guessLowerCase = guess.toLowerCase();

	let count = 0;

	for (let i in wordLowerCase){
		let position = guessLowerCase.indexOf(wordLowerCase[i]);
		if (position !== -1){
			count++;
			guessLowerCase = guessLowerCase.substring(0, position) + guessLowerCase.substring(position + 1);
		}
	}

  return count; // this line is wrong
}
