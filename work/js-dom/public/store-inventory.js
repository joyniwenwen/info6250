"use strict";
(function iife() {
    const items = [
        {
            name: 'apple',
            quantity: 100,
        },
    ];

    const itemsListEl = document.querySelector('#store-inventory-app .items');
    const addItemInputEl = document.querySelector('#store-inventory-app input');
    const addButtonEl = document.querySelector('#store-inventory-app button');

    disableAddButtonIfNoInput();
    addAblityToAddItems();
    addAblityToDeleteItems();
    addAblityToIncreaseQuantity();
    addAblityToDecreaseQuantity();
    render(items);

    function render(items) {
        const html = items.map((item, index) => {
            return `
                <li class='inventory-item'>
                    <div class='name-and-delete'>
                        <button class='delete' data-index='${index}'>X</button>
                        <span class='name' data-index='${index}'>${item.name}</span>
                    </div>
                    <div class='quantity-panel'>
                        <button class='minus' data-index='${index}'}>-</button>
                        <span class='quantity' data-index='${index}'>${item.quantity}</span>
                        <button class='plus' data-index='${index}'>+</button>
                    </div>
                </li>
            `;
        }).join('');
        itemsListEl.innerHTML = html;
        // Disable the minus button if quantity is not positive.
        document.querySelectorAll('#store-inventory-app .items .minus').forEach(
         (minusbt) => {
                minusbt.disabled = items[minusbt.dataset.index].quantity <= 0;
            }
        ); 
        // Disable add button if there is empty text in the input box.
        addButtonEl.disabled = !addItemInputEl.value;
    }

    function disableAddButtonIfNoInput() {
        addItemInputEl.addEventListener('input', () => {
            addButtonEl.disabled = !addItemInputEl.value;
        })
    }

    function addAblityToAddItems() {
        addButtonEl.addEventListener('click', (e) => {
            const newItem = {
                name: addItemInputEl.value,
                quantity: 0,
            };
            items.push(newItem);
            addItemInputEl.value = '';
            render(items);
        });
    }

    function addAblityToDeleteItems() {
        itemsListEl.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete')) {
                return;
            }
            
            const index = e.target.dataset.index;
            items.splice(index, 1);
            render(items);
        });
    }

    function addAblityToIncreaseQuantity() {
        itemsListEl.addEventListener('click', (e) => {
            if (!e.target.classList.contains('plus')) {
                return;
            }
            
            const index = e.target.dataset.index;
            items[index].quantity++;
            render(items);
        });
    }

    function addAblityToDecreaseQuantity() {
        itemsListEl.addEventListener('click', (e) => {
            if (!e.target.classList.contains('minus')) {
                return;
            }
            
            const index = e.target.dataset.index;
            items[index].quantity--;
            render(items);
        });
    }

})();

