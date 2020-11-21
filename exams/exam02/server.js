const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./session.js');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if(!sid) {
        res.status(401).json([{error: 'login-required'}]);
        return;
    }
    if(session.isValidSession(sid)) {
        res.status(200).json(session.isValidSession(sid));
    }
    res.status(403).json([{error: 'login-invalid'}]);
});

app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    const validationErrors = session.validateUsername(username);
    if(validationErrors) {
        res.status(400).json(validationErrors);
        return;
    }
    const sid = session.createSession(username);
    res.cookie('sid', sid);
    res.status(200).json({});
});

// Log out
app.delete('/session', express.json(), (req, res) => {
    if(!session.isValidSession(req.cookies.sid)) {
        res.status(403).json([{error: 'logout-invalid-session-id'}]);
        return;
    }
    session.deleteSession(req.cookies.sid);
    res.clearCookie('sid');
    res.status(200).json({});
});

// Retrive all recipes.
app.get('/recipes', (req, res) => {
    res.status(200).json(session.getrecipes());
});

// Retrieve one specific recipe.
app.get('/recipes/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    res.status(200).json(session.getrecipe(recipeId));
});

// Add a recipe
app.post('/recipes', express.json(), (req, res) => {
    // Check the user is logged in.
    const sid = req.cookies.sid;
    if(!session.isValidSession(req.cookies.sid)) {
        res.status(403).json([{error: 'add-recipe-unauthorized-user'}]);
        return;
    }
    const {title, ingredients, instructions} = req.body;
    const newrecipe = session.addrecipe(sid, title, ingredients, instructions);
    res.status(200).json(newrecipe);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));