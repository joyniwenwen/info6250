const express = require('express');
const app = express();
const PORT = 3000;

const userSession = require('./user-session');
const wordGuessWeb = require('./word-guess-web');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => { 
  const sid = req.cookies.sid;
  if (!sid || !userSession.isValidSessionID(sid)) {
      res.send(wordGuessWeb.loginPage());
      return;
  }
  res.send(wordGuessWeb.gamePage(sid, userSession));
});

app.post('/login', (req, res) => {
  const username = req.body.username.trim();
  const sid = uuidv4();
  res.cookie('sid', sid);
  userSession.addUser(sid, username)
  res.redirect('/');
});

app.post('/guess', (req, res) => {
    const word = req.body.word.trim();
    const sid = req.cookies.sid;
    userSession.guessWord(sid, word)
    res.redirect('/');
});

app.get('/restart', (req, res) => {
    const sid = req.cookies.sid;
    userSession.reloadGame(sid)
    res.redirect('/');
});

app.post('/logout', (req, res) => {
  res.clearCookie('sid');
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
