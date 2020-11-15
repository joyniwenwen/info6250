const uuid = require('uuid').v4;
// sessions is sid to username.
const sessions = {};
// tasks is username to task info.
const tasks = {};

const getSessionInfo = function(sid) {
    return sessions[sid];
};

const getTasks = function(sid) {
    const sessionInfo = getSessionInfo(sid);
    if (sessionInfo) {
        return tasks[sessionInfo.username];
    }
    return sessionInfo;
}

const findTaskByName = function(todos, taskname) {
    const index = todos.findIndex(todo => todo.task == taskname);
    if (index != -1) {
        return todos[index];
    }
    return undefined;
}

const findTaskById = function(todos, taskid) {
    const index = todos.findIndex(todo => todo.taskId == taskid);
    if (index != -1) {
        return todos[index];
    }
    return undefined;
}

const validateUsername = function(username) {
    const errors = [];
    if (!username) {
        errors.push({error: 'username-empty'});
    }
    if (username.includes('dog')) {
        errors.push({error: 'username-contains-dog'});
    }
    return errors.length ? errors : '';
};

const createSession = function(username) {
    const sid = uuid();
    sessions[sid] = {username};
    if (!tasks[username]) {
        tasks[username] = {username, nextTaskId: 1, todos:[
            {
                task: "have a todo list",
                done: false,
                taskId: 0,
            },
        ]};
    }
    return sid;
};

const deleteSession = function(sid) {
    delete sessions[sid];
}

const addNewTask = function(sid, taskname) {
    const tasksInfo = getTasks(sid);
    tasksInfo.todos.push(
        {
            task: taskname,
            done: false,
            taskId: tasksInfo.nextTaskId++,
        },
    );
    return tasksInfo;
}

const deleteTask = function(sid, taskid) {
    const tasksInfo = getTasks(sid);
    tasksInfo.todos = tasksInfo.todos.filter(todo => todo.taskId != taskid);
    return tasksInfo;
}

const toggleDone = function(sid, taskid) {
    const tasksInfo = getTasks(sid);
    const index = tasksInfo.todos.findIndex(todo => todo.taskId == taskid);
    tasksInfo.todos[index].done = !tasksInfo.todos[index].done;
    return tasksInfo;
}

const session = {
    getSessionInfo,
    getTasks,
    findTaskByName,
    findTaskById,
    validateUsername,
    createSession,
    deleteSession,
    addNewTask,
    deleteTask,
    toggleDone,
};

module.exports = session;