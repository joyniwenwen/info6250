const uuid = require('uuid').v4;
// session to username
const sessions = {};
// recipe id to recipes
const recipes = {
    0: {
        author: 'joynww',
        title: 'Fish Tacos',
        ingredients: 'Fish, Taco, Chilli Powder',
        instructions:  `Combine oil, vinegar, lime juice, lime zest, honey, garlic, seafood seasoning, cumin, 
                        chili powder, and black pepper in a nonreactive bowl or large resealable zip-top bag. 
                        Add mahi mahi and marinate for 8 hours, or overnight.
                        At the same time, combine yogurt, lime juice, and cilantro for dressing in a bowl. 
                        Chill overnight while fish marinates.
                        Preheat an outdoor grill for medium heat and lightly oil the grate. Remove mahi mahi
                        from marinade and place on a grill pan; discard excess marinade. Cook until fish flakes
                        easily with a fork, turning as needed, about 5 minutes.
                        Serve fish on warmed tortillas with dressing.
                        `,
        id: 0
    },
};

var nextrecipeId = 1;

const isValidSession = function(sid) {
    return sessions[sid];
}

const getrecipes = function() {
    return recipes;
}

const getrecipe = function(recipeId) {
    return recipes[recipeId];
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
}

const deleteSession = function(sid) {
    delete sessions[sid];
}

const createSession = function(username) {
    const sid = uuid();
    sessions[sid] = username;
    return sid;
} 

const addrecipe = function(sid, title, ingredients, instructions) {
    const newrecipe = {
        author: sessions[sid],
        title: title,
        ingredients: ingredients,
        instructions: instructions,
        id: nextrecipeId
    };
    recipes[nextrecipeId++] = newrecipe;
    return newrecipe;
}

const session = {
    isValidSession,
    getrecipes,
    getrecipe,
    validateUsername,
    createSession,
    deleteSession,
    addrecipe,
};

module.exports = session;