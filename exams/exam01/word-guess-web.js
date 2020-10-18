const wordGuessWeb = {
    gamePage: function(sid, userSession, words) {
      return `
        <!doctype html>
        <html>
          <head>
            <link rel="stylesheet" href="/word-guess.css">
            <title>Word Guessing Game</title>
          </head>
          <body>
            <div id="word-guessing-game">

              <div class="page-title">
                  <h2>Word Guessing Game, Welcome ${userSession.getUserInfo(sid).username} </h2>
              </div>

              <div class="game-panel">
                <div class="word-list-panel">
                  <h2>Secret Word List</h2>
                  <div class="word-list">
                    ${wordGuessWeb.getWordsList(userSession.getAvailableWords())}
                  </div>
                </div>
                <div class="accepted-guess-panel">
                  <h2>Guess & Matches History</h2>
                  <div class="word-list">
                      ${wordGuessWeb.getWordsList(userSession.getUserInfo(sid).guessedWords.map(
                          (wordAndNumOfCommonLetter) => 
                              `<p>${wordAndNumOfCommonLetter.guessedWord}/${wordAndNumOfCommonLetter.numOfCommonLetters}</p>`
                      ))}
                  </div>
                  <div class="turns">
                    Number Of Accepted Guesses: ${userSession.getTurns(sid)}
                  </div>
                </div>
                
                <div class="control-panel">
                  <h2>Control Panel</h2>
                  <div class="word-input">
                    ${wordGuessWeb.guessInput()}
                  </div>
                  <div class="controls">
                    <div class="restart"> 
                      ${wordGuessWeb.restart()}
                    </div>
                    <div class="logout"> 
                      <form action="/logout" method="POST"> 
                        <button class="logout-button" type="submit">LOGOUT</button>
                      </form>
                    </div>
                  </div> 
                  <div class="message-panel">
                    ${userSession.getUserMessage(sid)}
                  </div> 
                </div>
              </div>
            </div>
          </body>
        </html>
    `;
    },
    loginPage: function() {
        return `
          <!doctype html>
          <html>
            <head>
              <link rel="stylesheet" href="/word-guess.css">
              <title>Login Word Guessing Game</title>
            </head>
            <body>
              <div class="login-container">
                <div id="content" class="content-container">
                  <form action="/login" method="POST"> 
                    <div class="page-title">
                      <h2>Word Guessing Game</h2>
                    </div>
                    <div class="text-input" id="login_username">
                      <input name="username" placeholder="Enter your username"> 
                      <div class="space">
                        <button class="login-button" type="submit">LOGIN</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </body>
          </html>`;
    },
    getWordsList: function(wordsList) {
        return `<ul class="words">` +
            wordsList.map( word => `
                <li>
                    <div class="word">
                        <span class="word">${word}</span>
                    </div>
                </li>
                `).join('') + `</ul>`;
    },
    guessInput: function() {
        return `<form action="/guess" method="POST"> 
                    <input name="word" placeholder="Type your guess"> 
                    <button class="guess-button" type="submit">GUESS</button>
                </form>`;
    },
    restart: function() {
        return `<form action="/restart" method="GET"> 
                    <button class="restart-button" type="submit">RESTART</button>
                </form>`;
    },
  };
  module.exports = wordGuessWeb;