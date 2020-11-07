const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const users = require('./users');
const items = require('./items');

app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

// Session api.
app.post('/session', (req, res) => {
    const log_out = req.body.log_out;
    if (log_out === true) {
        if (users[req.cookies.sid]) {
            delete users[req.cookies.sid];
        }
        res.clearCookie('sid');
        res.json({});
        return;
    }
    const manual_login = req.body.manual_login;
    // Manual login.
    if (manual_login === true) {
        const username = req.body.username;
        if (!username) {
            res.status(400).json({ error: 'empty-username'});
            return;
        }
        if (username.indexOf(' ') >= 0) {
            res.status(400).json({ error: 'username-with-whitespace' });
            return;
        }
        if (username.includes('dog')) {
            res.status(400).json({ error: 'username-contain-dog'});
            return;
        }
        const new_sid = uuidv4();
        users[new_sid] = {username: username};
        res.cookie('sid', new_sid);
        res.json(users[new_sid]);
        return;
    }

    const sid = req.cookies.sid;
    // Auto login.
    if (!sid) {
        res.status(400).json({error: 'missing-sid'});
        //res.status(400).json({error: 'no-sid-in-cookie'});
        return;
    }
    // Has sid.
    if (!users[sid]) {
        res.clearCookie('sid');
        res.status(400).json({ error: 'unknown sid'});
        return;
    }
    res.json(users[sid]);
    return;
})

// Get all available items.
app.get('/items', (req, res) => {
    res.json(Object.values(items.itemList));
})

// Add new item.
app.post('/items', (req, res) => {
    const name = req.body.name;
    if(!name) {
        res.status(400).json({error: 'missing-name'});
        return;
    }
    // We use item id as key, so for checking duplicate name, we will go through the object values.
    const exist_name = Object.values(items.itemList).some(
        (item) => item.name === name
    );
    if(exist_name) {
        res.status(409).json({error: 'duplicate'});
        return;
    }
    const quantity = req.body.quantity;
    if(!quantity) {
        res.status(400).json({error: 'missing-quantity'});
        return;
    }
    const newItem = {
        name: req.body.name,
        quantity: req.body.quantity,
        item_id: items.getNextItemId(),
    };
    items.itemList[newItem.item_id] = newItem;
    res.json(newItem);
})

// Update quantity of existing item.
app.put('/items/:itemid', (req, res) => {
    const itemid = req.params.itemid;
    if (!items.itemList[itemid]) {
        res.status(409).json( {error: 'id-not-known'});
        return;
    }
    items.itemList[itemid].quantity = req.body.quantity;
    res.json(items.itemList[itemid])    
});

// Delete an item.
app.delete('/items/:itemid', (req, res) => {
    const itemid = req.params.itemid;
    if (!items.itemList[itemid]) {
        res.status(409).json( {error: 'id-not-known'});
        return;
    }
    delete items.itemList[itemid];
    res.json(Object.values(items.itemList));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));