const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const session = require('./session');
const PORT = 5000;


app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

// Check login status
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    res.status(200).json({currentUser: session.getUser(sid), users: session.getUsers(), messages: session.getMessages()});
});

// Login
app.post('/api/session', (req, res) => {
    const username = req.body.username;
    const {sid, error} = session.create(username);
    if (error) {
        res.status(400).json({error});
        return;
    }
    res.cookie('sid', sid);
    res.status(200).json({currentUser: username, users: session.getUsers(), messages: session.getMessages()});
});

// Logout
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    session.remove(sid);
    res.clearCookie('sid');
    res.status(200).json({});
});

// Send a new message
app.post('/api/message', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {message} = req.body;
    if (!message) {
        res.status(400).json({error: 'empty-message'});
        return;
    }
    const newMessage = session.addMessage(sid, message);
    res.status(200).json(newMessage);
});

// Get all messages and users.
app.get('/api/messagesandusers', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    res.status(200).json({currentUser: session.getUser(sid), users: session.getUsers(), messages: session.getMessages()});
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}/`)
});