const itemList = {
    1: {
        name: 'tennis A',
        quantity: 1,
        item_id: 1,
    },
    2: {
        name: 'tennis B',
        quantity: 1,
        item_id: 2,
    },
    3: {
        name: 'tennis C',
        quantity: 1,
        item_id: 3,
    },
};

var nextId = 4;

function getNextItemId() {
    return nextId++;
}

const items = {
    itemList,
    getNextItemId,
}

module.exports = items;