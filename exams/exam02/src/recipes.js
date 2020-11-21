"use strict";
import {
    checkLoginStatus,
    performLogin,
    performLogout,
    getrecipes,
    getrecipe,
    addrecipe
} from './services';


let recipeList = {};

(function iffe() {

    const errMsgs = {
        'login-invalid': 'Error: session ID unknown',
        'username-contains-dog': 'Error: username should not contain dog',
        'username-empty': 'Error: username is empty',
        'login-required': ' ',
    };

    addAbilityToLogin();
    addAbilityToLogout();
    addAbilityToShowDetails();
    addAbilityToAddrecipe();
    addAbilityToSubmitrecipe();
    addAbilityToReturnHome();

    showHomePage();
    checkLoginStatus()
    .then( (username) =>showLoggedIn(username)
    )
    .catch(errs => {
        showLogin(errs);
    }
    );

    function addAbilityToLogin() {
        document.querySelector('#recipe-app .login button').addEventListener('click', (e) => { 
            const username = document.querySelector('#recipe-app .login input').value;
            performLogin(username).then(() => {
                showLoggedIn(username);
            })
            .catch(errs => {
                showLogin(errs);
            }
            );
            e.preventDefault();
        });
    }

    function addAbilityToLogout() {
        document.querySelector('#recipe-app .logged-in button').addEventListener('click', (e) => {
            performLogout().then(() => {
                showHomePage();
                showLogin([]);
            });
            e.preventDefault();
        });
    }

    function addAbilityToShowDetails() {
        document.querySelector('#recipe-app .recipes').addEventListener('click', (e) => {
            if (!e.target.classList.contains('title')) {
                return;
            }
            const recipeId = e.target.dataset.recipeId;
            getrecipe(recipeId).then( (recipe) => {
                showDetailsPage(recipe);
            });
            e.preventDefault();
        });
    }

    function addAbilityToAddrecipe() {
        document.querySelector('#recipe-app .new-recipe').addEventListener('click', (e) => {
            showSubmitrecipePage();
            e.preventDefault();
        });
    }

    function addAbilityToSubmitrecipe() {
        document.querySelector('#recipe-app .recipe-adder button').addEventListener('click', (e) => {
            const title = document.querySelector('#recipe-app .recipe-adder .title-input').value;
            const ingredients = document.querySelector('#recipe-app .recipe-adder .ingredients-input').value;
            const instructions = document.querySelector('#recipe-app .recipe-adder .instructions-input').value;
            addrecipe(title, ingredients, instructions).then( (recipe) => {
                recipeList[recipe.id] = recipe;
                showDetailsPage(recipe);
            });
            document.querySelector('#recipe-app .recipe-adder .title-input').value = '';
            document.querySelector('#recipe-app .recipe-adder .ingredients-input').value = '';
            document.querySelector('#recipe-app .recipe-adder .instructions-input').value = '';
            e.preventDefault();
        });
    }

    function addAbilityToReturnHome() {
        document.querySelector('#recipe-app .homeBt').addEventListener('click', (e) => {
            showHomePage();
            e.preventDefault();
        });
    }

    function showHomePage() {
        document.querySelectorAll('#recipe-app .home').forEach(
            (item) => {
                item.classList.remove('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .submit-recipe').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .recipe-detail').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelector('#recipe-app .homeBt').classList.add('hidden');
        document.querySelector('#recipe-app .recipe-adder .title-input').value = '';
        document.querySelector('#recipe-app .recipe-adder .ingredients-input').value = '';
        document.querySelector('#recipe-app .recipe-adder .instructions-input').value = '';
        preparerecipeList();
    }

    function showDetailsPage(recipe) {
        document.querySelectorAll('#recipe-app .recipe-detail').forEach(
            (item) => {
                item.classList.remove('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .home').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .submit-recipe').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );

        document.querySelector('#recipe-app .homeBt').classList.remove('hidden');

        renderrecipeDetails(recipe);
    }

    function renderrecipeDetails(recipe) {
        document.querySelector('#recipe-app .recipe-detail').innerHTML = `
            <h1 class='title'>${recipe.title}</h1>
            <div class='author'>
                ${recipe.author}
            </div>
            <hr>
            <div class='ingredients'>
                <h2>Ingredients</h2>
                ${recipe.ingredients} 
            </div>
            <hr>
            <div class='instructions'>
                <h2>Instructions</h2>
                ${recipe.instructions} 
            </div>
        `;
    }

    function showSubmitrecipePage() {
        document.querySelectorAll('#recipe-app .submit-recipe').forEach(
            (item) => {
                item.classList.remove('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .home').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .recipe-detail').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelector('#recipe-app .homeBt').classList.remove('hidden');
        disableSubmitIfNoInput();
    }

    function disableSubmitIfNoInput() {
        const formEl = document.querySelector('#recipe-app .recipe-adder');
        const submitBtEl = document.querySelector('#recipe-app .recipe-adder button');
        const titleInputEl = document.querySelector('#recipe-app .recipe-adder .title-input');
        const ingredientsInputEl = document.querySelector('#recipe-app .recipe-adder .ingredients-input');
        const instructionsInputEl = document.querySelector('#recipe-app .recipe-adder .instructions-input');
        submitBtEl.disabled = !titleInputEl.value || !ingredientsInputEl.value || !instructionsInputEl.value;
        formEl.addEventListener('input', (e) => {
            submitBtEl.disabled = !titleInputEl.value || !ingredientsInputEl.value || !instructionsInputEl.value;
            e.preventDefault();
        });
    }

    function preparerecipeList() {
        getrecipes()
        .then( (recipes) => {
            recipeList = recipes;
            renderrecipeList(recipes);
        });
    }

    function renderrecipeList(recipes) {
        const recipeListHtml = Object.values(recipes).map( (recipe) => {
            return `<li>
                <div class='recipe' data-recipe-id=${recipe.id}>
                    <div class='recipe-img'>
                        <img src="./recipe.png"> 
                    </div>
                    <div class='recipe-description'>
                        <h3 class='title' data-recipe-id=${recipe.id}>${recipe.title}</h3>
                        <div class='author' data-recipe-id=${recipe.id}>
                            <h2>By</h2> ${recipe.author} 
                        </div>
                    </div>
                </div>
            </li>`;
        }).join('');
        document.querySelector('#recipe-app .recipes').innerHTML = recipeListHtml;
    }

    function showLogin(errs) {
        document.querySelectorAll('#recipe-app .login').forEach(
            (item) => {
                item.classList.remove('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .logged-in').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelector('#recipe-app .username').value = '';
        renderLoginErrors(errs);
    }

    function renderLoginErrors(errs) {
        document.querySelector('#recipe-app .login-errors .errors').innerHTML = errs.map(
            (err) => `<li>${errMsgs[err.error] || err.error}</li>`
        ).join('');
    }


    function showLoggedIn(username) {
        document.querySelectorAll('#recipe-app .logged-in').forEach(
            (item) => {
                item.classList.remove('hidden');
            }
        );
        document.querySelectorAll('#recipe-app .login').forEach(
            (item) => {
                item.classList.add('hidden');
            }
        );
        document.querySelector('#recipe-app .logged-in .username').innerText = username;
        document.querySelector('#recipe-app .recipe-adder .title-input').value = '';
        document.querySelector('#recipe-app .recipe-adder .ingredients-input').value = '';
        document.querySelector('#recipe-app .recipe-adder .instructions-input').value = '';
    }


})();
