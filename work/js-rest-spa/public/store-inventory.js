"use strict";
(function iife() {
    const appContentEl = document.querySelector('#store-inventory-app .app-content')
    const status = document.querySelector('.status');

    const errMsgs = {
        'empty-username': 'Bad login, user name should not be empty!',
        'username-with-whitespace': 'Bad login, user name should not contain whitespace!',
        'username-contain-dog': 'Bad login, user name should not contain dog!',
        'duplicate': 'Item is already in the inventory!',
        'id-not-known': 'Item does not exist in the inventory!',
        'missing-sid': ' ',
        'missing-name': ' ',
        'missing-quantity': ' ',
    };

    fetchSession({});

    // Update the status div with input message.
    function updateStatus( message ) {
        status.innerText = message;
    }

    // Convert the response.
    function convertError(response) {
        if(response.ok) {
          return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
    }

    // Fetch the session with appropriate input, and do DOM manipulation according to the fetch result. 
    function fetchSession({username, is_manual_login, is_log_out}) {
        fetch('/session', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({username: username, manual_login: is_manual_login, log_out: is_log_out}),
        })
        .catch(() => Promise.reject({error: 'network-error'}))
        .then(convertError)
        .then((user) => {
            if (user.username) {
                prepareInventoryPage(user);
            } else {
                prepareLoginPage();
            }
            updateStatus('');
        })
        .catch( err => {
            prepareLoginPage();
            updateStatus(errMsgs[err.error] || err.error)
        });
    }

    // Render the login page and add event listeners.
    function prepareLoginPage() {
        addLoginHtml();
        const usernameInputEl = document.querySelector('#store-inventory-app .username');
        const loginButtonEl = document.querySelector('#store-inventory-app .loginBt');
        addAbilityToLogin();
        disableLoginIfNoUsername();
        loginButtonEl.disabled = !usernameInputEl.value;

        function addLoginHtml() {
            const loginHtml =  `
                <div class="login">
                    User Name:
                    <input class="username">
                    <button class="loginBt">LOGIN</button>
                </div>
                `;
            return  appContentEl.innerHTML = loginHtml;;
        }

        function disableLoginIfNoUsername() {
            usernameInputEl,addEventListener('input', () => {
                loginButtonEl.disabled = !usernameInputEl.value;
            });
        }

        function addAbilityToLogin() {
            loginButtonEl.addEventListener('click', (e) => {
                fetchSession({username: usernameInputEl.value, is_manual_login: true});
            });
        }
    }

    // Render the inventory page and add event listeners.
    function prepareInventoryPage(user) {
        addInventoryHtml(user);
        const addItemNameInputEl = document.querySelector('#store-inventory-app .item-name-to-add');
        const addItemQuantityInputEl = document.querySelector('#store-inventory-app .item-quantity-to-add');
        const itemsListEl = document.querySelector('#store-inventory-app .items');
        const addButtonEl = document.querySelector('#store-inventory-app .item-adder button');
        const logoutButtonEl = document.querySelector('#store-inventory-app .logout');
        const loadingEl = document.querySelector('#store-inventory-app .loading-panel');

        disableAddButtonIfNoInput();
        addAblityToAddItem();
        addAblityToUpdateItem();
        addAblityToDeleteItem();
        addAbilityToLogout();
        fetchAndRenderItemList();
        addButtonEl.disabled = !addItemNameInputEl.value;

        function disableAddButtonIfNoInput() {
            addItemNameInputEl.addEventListener('input', () => {
                addButtonEl.disabled = !addItemNameInputEl.value;
            })
        }

        function disableLoadingPanel() {
            loadingEl.innerText = '';
        }

        function addInventoryHtml(user) {
            const inventoryHtml =  `
                <div class='welcome-panel'>
                    Welcome, ${user.username}
                    <button class="logout">LOGOUT</button>
                </div>
                <div class='item-adder'>
                    Name:
                    <input class="item-name-to-add">
                    Quantity:
                    <input class="item-quantity-to-add" value ='0'>
                    <button class="add">Add</button>
                </div>
                <div class='item-panel'>
                    <div class='item-list'>
                        <ul class="items" >
                        </ul>
                    </div>
                </div>
                <div class='loading-panel'>
                    Loading...
                </div>`;
            appContentEl.innerHTML = inventoryHtml;
        }

        function addAbilityToLogout() {
            logoutButtonEl.addEventListener('click', (e) => {
                console.log('logout')
                fetchSession({is_log_out: true});
            });
        }

        function addAblityToAddItem() {
            addButtonEl.addEventListener('click', (e) => {
                const newItem = {
                    name: addItemNameInputEl.value,
                    quantity: addItemQuantityInputEl.value,
                };
                fetch('/items', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify(newItem),
                })
                .catch(() => Promise.reject({error: 'network-error'}))
                .then(convertError)
                .then(item => {
                    itemsListEl.innerHTML += renderOneItem(item);
                    addItemQuantityInputEl.value = 0;
                    addItemNameInputEl.value = '';
                    addButtonEl.disabled = !addItemNameInputEl.value;
                    updateStatus('');
                })
                .catch(err =>  {
                    addItemQuantityInputEl.value = 0;
                    addItemNameInputEl.value = '';
                    addButtonEl.disabled = !addItemNameInputEl.value;
                    updateStatus(errMsgs[err.error] || err.error);
                });
            });
        }
    
        function addAblityToUpdateItem() {
            itemsListEl.addEventListener('click', (e) => {
                if (!e.target.classList.contains('update')) {
                    return;
                }
                const id = e.target.dataset.itemId;
                const quantity = e.target.parentNode.querySelector('.quantity').value;
                fetch(`/items/${id}`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PUT',
                    body: JSON.stringify({quantity: quantity}),
                })
                .catch(() => Promise.reject({error: 'network-error'}))
                .then(convertError)
                .then(
                    (item) => {
                        itemsListEl.querySelector(`input[data-item-id="${item.item_id}"]`).setAttribute('value', item.quantity);
                        updateStatus('');
                    }
                ).catch(
                    err => {
                        // Remove the item if there is an error.
                        itemsListEl.querySelector(`input[data-item-id="${id}"]`).parentNode.parentNode.remove();
                        updateStatus(errMsgs[err.error] || err.error);
                    }
                );
            })
        }

        function addAblityToDeleteItem() {
            itemsListEl.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete')) {
                    return;
                }
                
                const id = e.target.dataset.itemId;

                fetch(`/items/${id}`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'DELETE',
                })
                .catch(() => Promise.reject({error: 'network-error'}))
                .then(convertError)
                .then(items => {
                    renderItemList(items);
                    updateStatus('');
                })
                .catch(
                    (err) => {
                        // Remove the item if there is an error.
                        itemsListEl.querySelector(`input[data-item-id="${id}"]`).parentNode.parentNode.remove();
                        updateStatus(errMsgs[err.error] || err.error); 
                    }
                );
            });
        }

        function renderItemList(items) {
            const html = items.map((item, index) => {
                return renderOneItem(item);
            }).join('');
            itemsListEl.innerHTML = html;
            // Disable the minus button if quantity is not positive.
            document.querySelectorAll('#store-inventory-app .items .minus').forEach(
             (minusbt) => {
                    minusbt.disabled = items[minusbt.dataset.index].quantity <= 0;
                }
            ); 
            // Disable add button if there is empty text in the input box.
            addButtonEl.disabled = !addItemNameInputEl.value;
        }

        function renderOneItem(item) {
            return `
            <li class='inventory-item'>
                <div class='name-and-delete'>
                    <button class='delete' data-item-id='${item.item_id}'>X</button>
                    <span class='name' data-item-id='${item.item_id}'>${item.name}</span>
                </div>
                <div class='quantity-panel'>
                    <input class='quantity' data-item-id='${item.item_id}' value=${item.quantity}>
                    <button class='update' data-item-id='${item.item_id}'>Update</button>
                </div>
            </li>
        `;
        }

        function fetchAndRenderItemList() {
            fetch('/items', {
                headers: {'Content-Type': 'application/json'},
                method: 'GET',
            })
            .catch(() => Promise.reject({error: 'network-error'}))
            .then(convertError)
            .then((items) => {
                renderItemList(items);
                disableLoadingPanel();
                updateStatus('');
            })
            .catch(
                (err) => {
                    updateStatus(errMsgs[err.error] || err.error); 
                }
            );
        }

    }

})();