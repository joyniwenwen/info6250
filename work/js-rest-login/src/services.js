export const checkLoginStatus = function() {
   return fetch('/session', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then( err => Promise.reject(err));
    });
};


export const performLogin = function(username) {
    return fetch('/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:username}),
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
};

export const addTask = function(taskname) {
    return fetch('/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskname:taskname}),
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
};

export const deleteTask = function(taskid) {
    return fetch(`/task/${taskid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
};

export const getTasks = function() {
    return fetch('/task', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
};

export const toggleDone = function(taskid) {
    return fetch(`/task/${taskid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
};

export const performLogout = function() {
    return fetch(`/session`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
};