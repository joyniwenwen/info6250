export const checkLoginStatus = function() {
    return fetch('/session', {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({ error: 'network-error' });
    })
    .then( response => {
        if(response.ok) {
            return response.json();
        }
        return response.json().then( err => Promise.reject(err));
    })
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

export const getrecipes = function() {
    return fetch('/recipes', {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({ error: 'network-error' });
    })
    .then( response => {
        if(response.ok) {
            return response.json();
        }
        return response.json().then( err => Promise.reject(err));
    })
};

export const getrecipe = function(recipeId) {
    return fetch(`/recipes/${recipeId}`, {
        method: 'GET',
    })
    .catch( () => {
        return Promise.reject({ error: 'network-error' });
    })
    .then( response => {
        if(response.ok) {
            return response.json();
        }
        return response.json().then( err => Promise.reject(err));
    })
};

export const addrecipe = function(title, ingredients, instructions) {
    return fetch('/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, ingredients: ingredients, instructions: instructions}),
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if (response.ok) {
            const result = response.json();
            return result;
        }
        return response.json().then( err => Promise.reject(err));
    });
}