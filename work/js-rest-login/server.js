const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./session.js');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());

// Check log in.
app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json([{error: 'login-required'}]);
        return;
    }
    const tasksInfo = session.getTasks(sid);
    if (!tasksInfo) {
        res.status(403).json([{error: 'login-invalid'}]);
        return;
    }
    res.status(200).json(tasksInfo);
});

// Log in
app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    const validationErrors = session.validateUsername(username);
    if ( validationErrors ) {
        res.status(400).json(validationErrors);
        return;
    }
    const sid = session.createSession(username);
    res.cookie('sid', sid);
    res.status(200).json(session.getTasks(sid));
});

// Log out
app.delete('/session', express.json(), (req, res) => {
    session.deleteSession(req.cookies.sid);
    res.clearCookie('sid');
    res.status(200).json({});
});

// Add a new task
app.post('/task', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    const {taskname} = req.body;
    if(session.findTaskByName(session.getTasks(sid).todos, taskname)) {
        res.status(409).json([{error: 'duplicated-taskname'}]);
        return;
    }
    res.status(200).json(session.addNewTask(sid, taskname));
});

// Delete an existing task 
app.delete('/task/:taskid', express.json(), (req, res) => {
    const taskid = req.params.taskid;
    const sid = req.cookies.sid;
    if(!session.findTaskById(session.getTasks(sid).todos, taskid)) {
        res.status(404).json([{error: 'task-id-not-found'}]);
        return;
    } 
    res.status(200).json(session.deleteTask(sid, taskid));
});

// Toggle
app.put('/task/:taskid', express.json(), (req, res) => {
    const taskid = req.params.taskid;
    const sid = req.cookies.sid;
    if(!session.findTaskById(session.getTasks(sid).todos, taskid)) {
        res.status(404).json([{error: 'task-id-not-found'}]);
        return;
    }
    res.status(200).json(session.toggleDone(sid, taskid));
});

// Get all tasks.
app.get('/task', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    res.status(200).json(session.getTasks(sid));
});

app.listen(PORT, () => console.log(`http://locahost:${PORT}`))