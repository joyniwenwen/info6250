const uuid = require('uuid').v4;

const users = {};
const sessions = {};
const messages = [{
    sender: "Amit",
    timestamp: new Date("2019-01-01 19:20:00"),
    text: "You up?",
    id: 0,
}, {
    sender: "Bao",
    timestamp: new Date("2019-01-01 19:21:00"),
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    id: 1,
}];

let nextMessageId = 2;

const isValidUsername = function(username) {
    if (!username) {
        return false;
    }
    if (username.includes('dog')) {
        return false;
    } 
    return true;
};

const create = function(username) {
    if(!username) {
        return {error: 'username-required'};
    }
    if(!isValidUsername(username)) {
        return {error: 'username-invalid'};
    }
    const sid = uuid();
    if (!users[username]) {
        users[username] = {username};
    }
    sessions[sid] = {
        sid,
        username,
        startTime: Date.now(),
    }
    return {sid};
};

const remove = function(sid) {
    const username = sessions[sid].username;
    delete sessions[sid];
    for (const session in sessions) {
        if (session.username === username) {
            return;
        }
    }
    delete users[username];
};

const addMessage = function(sid, message) {
    const newMessage = {
        sender: sessions[sid].username,
        timestamp: new Date(),
        text: message,
        id: nextMessageId++,
    };
    messages.push(newMessage);
    return newMessage;
};

const getUsers = function() {
    return Object.keys(users);
}

const getUser = function(sid) {
    return sessions[sid]['username'];
}

const getMessages = function() {
    return messages;
}

const isValid = function(sid) {
    return sessions[sid];
};

const session = {
    create,
    remove,
    isValid,
    addMessage,
    getUsers,
    getUser,
    getMessages,
};

module.exports = session;