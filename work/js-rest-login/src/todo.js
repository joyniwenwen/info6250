"use strict";

import session from '../session';
import {
    checkLoginStatus,
    performLogin,
    addTask,
    deleteTask,
    toggleDone,
    performLogout,
    getTasks,
} from './services'

(function iife() {

    const errMsgs = {
        'login-invalid': 'Error: session ID unknown',
        'duplicated-taskname': 'Error: task name is duplicated',
        'username-contains-dog': 'Error: username should not contain dog',
        'task-id-not-found': 'Error: task not exist',
        'login-required': ' ',
    };

    addAbilityToLogin();
    addAbilityToAdd();
    addAbilityToDelete();
    addAbilityToToggleDone();
    addAbilityToLogout();

    checkLoginStatus()
    .then(tasksInfo => {
        prepareContentPage(tasksInfo);
    })
    .catch( errors => {
        showLogin();
        renderErrorStatus(errors);
    });

    function prepareContentPage(tasksInfo) {
        showContent();
        renderWelcome(tasksInfo);
        updateTasksPeriodically();
        renderErrorStatus([]);
    }

    function showLogin() {
        document.querySelector('#todo-app .logged-in').classList.add('hidden');
        document.querySelector('#todo-app .login').classList.remove('hidden');
        document.querySelector('#todo-app .username').value = '';
    }

    function showContent() {
        document.querySelector('#todo-app .login').classList.add('hidden');
        document.querySelector('#todo-app .logged-in').classList.remove('hidden');
        document.querySelector('#todo-app .taskname').value = '';
    }

    function addAbilityToLogin() {
        const loginButtonEl = document.querySelector('#todo-app .login button').addEventListener('click', () => { 
            const username = document.querySelector('#todo-app input').value;
            performLogin(username).then((tasksInfo) => {
                prepareContentPage(tasksInfo);
            })
            .catch(errors => {
                showLogin();
                renderErrorStatus(errors);
            }
            );
        });
    }

    function renderTodoList(tasksInfo) {
        const todolistEl = document.querySelector('#todo-app .todos');
        const todosHtml = tasksInfo.todos.map(
            (todo) => {
                const done = todo.done ? 'done' : '';
                return `<li class="todo">
            <button class='delete' type="button" data-task-id=${todo.taskId}>X</button>
            <span class='task ${done}' data-task-id=${todo.taskId}>${todo.task}</span>
            </li>`;
            }
        ).join('');
        todolistEl.innerHTML = todosHtml;
    }
 
    function renderWelcome(tasksInfo) {
        document.querySelector('#todo-app .welcome span').innerText = `Welcome, ${tasksInfo.username}`;
    }

    function renderErrorStatus(errs) {
        document.querySelector('#todo-app .error').innerHTML = errs.map(
            (err) => errMsgs[err.error] || err.error
        );
    }

    function addAbilityToAdd() {
        document.querySelector('#todo-app .task-adder button').addEventListener('click', (e) => {
            const taskname = document.querySelector('#todo-app .task-adder input').value;
            addTask(taskname).then((tasksInfo) => {
                document.querySelector('#todo-app .task-adder input').value = '';
                renderTodoList(tasksInfo);
            })
            .catch((errors) => {
                    document.querySelector('#todo-app .task-adder input').value = '';
                    renderErrorStatus(errors);
            });
        });
    }

    function addAbilityToDelete() {
        document.querySelector('#todo-app .todos').addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete')) {
                return;
            }
            const taskId = e.target.dataset.taskId;
            deleteTask(taskId).then((tasksInfo) => {
                renderTodoList(tasksInfo);
            });

        });
    }

    function addAbilityToToggleDone() {
        document.querySelector('#todo-app .todos').addEventListener('click', (e) => {
            if (!e.target.classList.contains('task')) {
                return;
            }
            const taskId = e.target.dataset.taskId;
            toggleDone(taskId).then((tasksInfo) => {
                renderTodoList(tasksInfo);
            });
        });
    } 

    function addAbilityToLogout() {
        document.querySelector('#todo-app .welcome button').addEventListener('click', (e) => {
            performLogout().then(() => showLogin());
        });
    }

    function updateTasksPeriodically() {
        getTasks()
        .then((tasksInfo) => {
            renderTodoList(tasksInfo);
        })
        .then(setTimeout(updateTasksPeriodically, 5000));
    }

})()