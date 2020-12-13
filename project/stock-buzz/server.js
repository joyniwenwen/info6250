const express = require('express');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

const app = express();
const session = require('./session');
const PORT = 5000;


app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

const finhubToken = 'bv4sdvn48v6qpateqbd0';
const finmodelToken = '85fdb9f1a1c3f9ba3180be757f3291e3';

// Check login status
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    res.status(200).json(session.getUser(sid));
});


// Login
app.post('/api/session', express.json(), (req, res) => {
    const {username} = req.body;
    const {sid, error} = session.create(username);
    if (error) {
        res.status(400).json({error});
        return;
    }
    res.cookie('sid', sid);
    res.status(200).json(session.getUser(sid));
});

// Logout
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    session.remove(sid);
    res.clearCookie('sid');
    res.status(200).json({});
});

// Create stock watchlist.
app.post('/api/watchlist', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {name} = req.body;
    const {error} = session.createWatchlist(sid, name);
    if (error) {
        res.status(400).json({error});
        return;
    }
    return res.status(200).json({});
});

// Delete stock watchlist with id.
app.delete('/api/watchlist', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {id} = req.body;
    session.deleteWatchlist(sid, id);
    return res.status(200).json({});
});

// Add stocks to existing watchlist.
app.post('/api/watchlistStock', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {watchlistName, stockSymbol} = req.body;
    const watchlistId = session.addWatchlistStock(sid, watchlistName, stockSymbol);
    res.status(200).json( session.getWatchlistStocks(sid, watchlistId));
});

// Delete stocks from existing watchlist.
app.delete('/api/watchlistStock', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {watchlistId, stockSymbol} = req.body;
    session.deleteWatchlistStock(sid, watchlistId, stockSymbol);
    res.status(200).json( session.getWatchlistStocks(sid, watchlistId));
});

// Get stock quotes given a list of symbols.
app.post('/api/stockQuotes', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {symbols} = req.body;

    Promise.all(
        symbols.map((symbol) => {
            return fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finhubToken}`,
                {method: 'GET'})
                .then(resp => resp.json())
    }))
    .then(results => res.status(200).json(results))
    .catch(err => res.status(400).json(err));

})

// Get all user posts.
app.get('/api/posts', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    res.status(200).json(session.getPosts()); 
})

// Add a new post.
app.post('/api/posts', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {msg} = req.body;
    const newPost = session.addPost(sid, msg);
    res.status(200).json(newPost);
})

// Like a post
app.post('/api/likepost', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {id} = req.body;
    session.likePost(id);
    res.status(200).json({});
})

// Dislike a post
app.post('/api/dislikepost', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const {id} = req.body;
    session.dislikePost(id);
    res.status(200).json({});
})

// Get price history for a specific stock.
app.get('/api/priceHistory/:symbol', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const symbol = req.params.symbol;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${parseInt(startDate.getTime()/1000, 10)}&to=${parseInt(Date.now()/1000, 10)}&token=${finhubToken}`,
    {method: 'GET'})
    .then(resp => resp.json())
    .catch((err) => res.status(500).json({error: err}))
    .then(resp => res.status(200).json(resp))
})

// Get income statement for a given symbol.
app.get('/api/incomeStatement/:symbol', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required'});
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid'});
        return;
    }
    const symbol = req.params.symbol;
    fetch(`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=year&limit=400&apikey=${finmodelToken}`,
                {method: 'GET'})
                .then(resp => resp.json())
                .catch((err) => res.status(500).json({error: err}))
                .then(resp => res.status(200).json(resp))
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}/`)
});