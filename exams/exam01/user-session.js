const words = require('./words');
const compare = require('./compare');
// user name to session id.
const userInfos = {};

function addUser(sid, name) {
    // Check existing usernames to reuse previous game info.
    for (const storedID in userInfos) {
        if (userInfos[storedID].username === name) {
            userInfos[sid] = userInfos[storedID];
            delete userInfos[storedID];
            return;
        }
    }
    userInfos[sid] = {username:name};
    reloadGame(sid);
};

function isValidSessionID(sid) {
    if (userInfos[sid]) {
        return true;
    }
    return false;
};

function getUserInfo(sid) {
    return userInfos[sid];
};

function addGuessedWord(sid, word) {
    userInfos[sid].guessedWords.push({
        guessedWord: word, 
        numOfCommonLetters: compare(words[userInfos[sid].targetWordId].toUpperCase(), word.toUpperCase()),
    });
};

function getTurns(sid) {
    return getUserInfo(sid).turns;
};

function guessWord(sid, guessedWord) {
    if (!words.map(function (word) { 
        return word.toUpperCase()
    }).includes(guessedWord.toUpperCase())) {
        userInfos[sid].message = "Warning: Invalid Word: " + "<strong>" + guessedWord + "</strong>. Only Use Words From Secret Word List!";
        return false;
    }
    addGuessedWord(sid, guessedWord)
    if (userInfos[sid].guessedWords[userInfos[sid].guessedWords.length - 1].numOfCommonLetters > 0) {
        userInfos[sid].turns++;
    }
    if (words[userInfos[sid].targetWordId].toUpperCase() === guessedWord.toUpperCase()) {
        userInfos[sid].message = "You Have Won The Game With " + "<strong>" + userInfos[sid].turns + "</strong> guesses! Hit Restart For A New Game!";
        return true;
    }
    userInfos[sid].message = "Try A New Guess!";
    return false;
}

function reloadGame(sid) {
    name = userInfos[sid].username;
    const wordId = Math.floor(Math.random() * words.length);
    console.log("Secret word: " + words[wordId])
    userInfos[sid] = {username: name, turns: 0, guessedWords:[], message:"", numOfCommonLetters: 0, targetWordId: wordId };
};

function getAvailableWords() {
    return words;
}

function getCommonLetters(sid) {
    return userInfos[sid].numOfCommonLetters;
}

function getUserMessage(sid) {
    return userInfos[sid].message
}

const userSession = {
    userInfos,
    addUser,
    isValidSessionID,
    getUserInfo,
    addGuessedWord,
    getTurns,
    guessWord,
    getAvailableWords,
    getCommonLetters,
    getUserMessage,
    reloadGame,
};

module.exports = userSession;