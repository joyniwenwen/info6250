/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/recipes.js":
/*!************************!*\
  !*** ./src/recipes.js ***!
  \************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");



var recipeList = {};

(function iffe() {
  var errMsgs = {
    'login-invalid': 'Error: session ID unknown',
    'username-contains-dog': 'Error: username should not contain dog',
    'username-empty': 'Error: username is empty',
    'login-required': ' '
  };
  addAbilityToLogin();
  addAbilityToLogout();
  addAbilityToShowDetails();
  addAbilityToAddrecipe();
  addAbilityToSubmitrecipe();
  addAbilityToReturnHome();
  showHomePage();
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (username) {
    return showLoggedIn(username);
  })["catch"](function (errs) {
    showLogin(errs);
  });

  function addAbilityToLogin() {
    document.querySelector('#recipe-app .login button').addEventListener('click', function (e) {
      var username = document.querySelector('#recipe-app .login input').value;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function () {
        showLoggedIn(username);
      })["catch"](function (errs) {
        showLogin(errs);
      });
      e.preventDefault();
    });
  }

  function addAbilityToLogout() {
    document.querySelector('#recipe-app .logged-in button').addEventListener('click', function (e) {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(function () {
        showHomePage();
        showLogin([]);
      });
      e.preventDefault();
    });
  }

  function addAbilityToShowDetails() {
    document.querySelector('#recipe-app .recipes').addEventListener('click', function (e) {
      if (!e.target.classList.contains('title')) {
        return;
      }

      var recipeId = e.target.dataset.recipeId;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.getrecipe)(recipeId).then(function (recipe) {
        showDetailsPage(recipe);
      });
      e.preventDefault();
    });
  }

  function addAbilityToAddrecipe() {
    document.querySelector('#recipe-app .new-recipe').addEventListener('click', function (e) {
      showSubmitrecipePage();
      e.preventDefault();
    });
  }

  function addAbilityToSubmitrecipe() {
    document.querySelector('#recipe-app .recipe-adder button').addEventListener('click', function (e) {
      var title = document.querySelector('#recipe-app .recipe-adder .title-input').value;
      var ingredients = document.querySelector('#recipe-app .recipe-adder .ingredients-input').value;
      var instructions = document.querySelector('#recipe-app .recipe-adder .instructions-input').value;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.addrecipe)(title, ingredients, instructions).then(function (recipe) {
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
    document.querySelector('#recipe-app .homeBt').addEventListener('click', function (e) {
      showHomePage();
      e.preventDefault();
    });
  }

  function showHomePage() {
    document.querySelectorAll('#recipe-app .home').forEach(function (item) {
      item.classList.remove('hidden');
    });
    document.querySelectorAll('#recipe-app .submit-recipe').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelectorAll('#recipe-app .recipe-detail').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelector('#recipe-app .homeBt').classList.add('hidden');
    document.querySelector('#recipe-app .recipe-adder .title-input').value = '';
    document.querySelector('#recipe-app .recipe-adder .ingredients-input').value = '';
    document.querySelector('#recipe-app .recipe-adder .instructions-input').value = '';
    preparerecipeList();
  }

  function showDetailsPage(recipe) {
    document.querySelectorAll('#recipe-app .recipe-detail').forEach(function (item) {
      item.classList.remove('hidden');
    });
    document.querySelectorAll('#recipe-app .home').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelectorAll('#recipe-app .submit-recipe').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelector('#recipe-app .homeBt').classList.remove('hidden');
    renderrecipeDetails(recipe);
  }

  function renderrecipeDetails(recipe) {
    document.querySelector('#recipe-app .recipe-detail').innerHTML = "\n            <h1 class='title'>".concat(recipe.title, "</h1>\n            <div class='author'>\n                ").concat(recipe.author, "\n            </div>\n            <hr>\n            <div class='ingredients'>\n                <h2>Ingredients</h2>\n                ").concat(recipe.ingredients, " \n            </div>\n            <hr>\n            <div class='instructions'>\n                <h2>Instructions</h2>\n                ").concat(recipe.instructions, " \n            </div>\n        ");
  }

  function showSubmitrecipePage() {
    document.querySelectorAll('#recipe-app .submit-recipe').forEach(function (item) {
      item.classList.remove('hidden');
    });
    document.querySelectorAll('#recipe-app .home').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelectorAll('#recipe-app .recipe-detail').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelector('#recipe-app .homeBt').classList.remove('hidden');
    disableSubmitIfNoInput();
  }

  function disableSubmitIfNoInput() {
    var formEl = document.querySelector('#recipe-app .recipe-adder');
    var submitBtEl = document.querySelector('#recipe-app .recipe-adder button');
    var titleInputEl = document.querySelector('#recipe-app .recipe-adder .title-input');
    var ingredientsInputEl = document.querySelector('#recipe-app .recipe-adder .ingredients-input');
    var instructionsInputEl = document.querySelector('#recipe-app .recipe-adder .instructions-input');
    submitBtEl.disabled = !titleInputEl.value || !ingredientsInputEl.value || !instructionsInputEl.value;
    formEl.addEventListener('input', function (e) {
      submitBtEl.disabled = !titleInputEl.value || !ingredientsInputEl.value || !instructionsInputEl.value;
      e.preventDefault();
    });
  }

  function preparerecipeList() {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.getrecipes)().then(function (recipes) {
      recipeList = recipes;
      renderrecipeList(recipes);
    });
  }

  function renderrecipeList(recipes) {
    var recipeListHtml = Object.values(recipes).map(function (recipe) {
      return "<li>\n                <div class='recipe' data-recipe-id=".concat(recipe.id, ">\n                    <div class='recipe-img'>\n                        <img src=\"./recipe.png\"> \n                    </div>\n                    <div class='recipe-description'>\n                        <h3 class='title' data-recipe-id=").concat(recipe.id, ">").concat(recipe.title, "</h3>\n                        <div class='author' data-recipe-id=").concat(recipe.id, ">\n                            <h2>By</h2> ").concat(recipe.author, " \n                        </div>\n                    </div>\n                </div>\n            </li>");
    }).join('');
    document.querySelector('#recipe-app .recipes').innerHTML = recipeListHtml;
  }

  function showLogin(errs) {
    document.querySelectorAll('#recipe-app .login').forEach(function (item) {
      item.classList.remove('hidden');
    });
    document.querySelectorAll('#recipe-app .logged-in').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelector('#recipe-app .username').value = '';
    renderLoginErrors(errs);
  }

  function renderLoginErrors(errs) {
    document.querySelector('#recipe-app .login-errors .errors').innerHTML = errs.map(function (err) {
      return "<li>".concat(errMsgs[err.error] || err.error, "</li>");
    }).join('');
  }

  function showLoggedIn(username) {
    document.querySelectorAll('#recipe-app .logged-in').forEach(function (item) {
      item.classList.remove('hidden');
    });
    document.querySelectorAll('#recipe-app .login').forEach(function (item) {
      item.classList.add('hidden');
    });
    document.querySelector('#recipe-app .logged-in .username').innerText = username;
    document.querySelector('#recipe-app .recipe-adder .title-input').value = '';
    document.querySelector('#recipe-app .recipe-adder .ingredients-input').value = '';
    document.querySelector('#recipe-app .recipe-adder .instructions-input').value = '';
  }
})();

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export addrecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getrecipe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getrecipes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "performLogin": () => /* binding */ performLogin,
/* harmony export */   "performLogout": () => /* binding */ performLogout,
/* harmony export */   "getrecipes": () => /* binding */ getrecipes,
/* harmony export */   "getrecipe": () => /* binding */ getrecipe,
/* harmony export */   "addrecipe": () => /* binding */ addrecipe
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      var result = response.json();
      return result;
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout() {
  return fetch("/session", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      var result = response.json();
      return result;
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getrecipes = function getrecipes() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getrecipe = function getrecipe(recipeId) {
  return fetch("/recipes/".concat(recipeId), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var addrecipe = function addrecipe(title, ingredients, instructions) {
  return fetch('/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instructions: instructions
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      var result = response.json();
      return result;
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/recipes.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=recipes.js.map