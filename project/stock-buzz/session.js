const uuid = require('uuid').v4;

const users = {};
const sessions = {};
let nextPostId = 1;
const posts = [
    {
        username: 'warren_buffet',
        msg: 'I made a lot of money on @AAPL. Great stock!',
        timestamp: new Date("2020-03-01 19:20:00"),
        id: 0,
        like: 100,
        dislike: 30,
    },
    {
        username: 'bill_ackmen',
        msg: 'Betted on the market crash, 2.6 billion in less than a month!',
        timestamp: new Date("2020-04-01 19:21:00"),
        id: 0,
        like: 1000,
        dislike: 20,
    },
    {
        username: 'cathie_wood',
        msg: 'Ark invest is beating the market!',
        timestamp: new Date("2020-09-01 09:00:00"),
        id: 0,
        like: 300,
        dislike: 10,
    },
];

const isValidUsername = function(username) {
    if (!username) {
        return false;
    }

    if (username.includes('dog')) {
        return false;
    } 
    const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
    if(username !== cleanUsername) {
      return false;
    }
    return true;
};

const isValidWatchlistName = function(watchlistName) {
    if (!watchlistName) {
        return false;
    }

    const cleanWatchlistName = watchlistName.replace(/[^a-zA-Z0-9_\-]/g, '');
    if(watchlistName !== cleanWatchlistName) {
      return false;
    }
    return true;
}

const create = function(username) {
    if(!username) {
        return {error: 'username-required'};
    }
    if(!isValidUsername(username)) {
        return {error: 'username-invalid'};
    }
    const sid = uuid();
    const currentTime = Date.now();
    if (!users[username]) {
        users[username] = {
            username, 
            watchlists: {
                0: {
                    name: 'default',
                    id: 0,
                    stocks: {
                        'AAPL': {
                            symbol: 'AAPL',
                            price: 0,
                            change: 0,
                        },
                        'FB': {
                            symbol: 'FB',
                            price: 0,
                            change: 0,
                        },
                        'MSFT': {
                            symbol: 'MSFT',
                            price: 0,
                            change: 0,
                        },
                    },
                },
            }, 
            nextWatchlistsId: 1,
            registerTime: currentTime
        };
    }
    sessions[sid] = {
        sid,
        username,
        startTime: currentTime,
    }
    return {sid};
};

const remove = function(sid) {
    const username = sessions[sid].username;
    delete sessions[sid];
    for (const session in sessions) {
        if (session.username === username) {
            return;
        }
    }
    delete users[username];
};

const getUser = function(sid) {
    return users[sessions[sid]['username']];
}

const isValid = function(sid) {
    return sessions[sid];
};

const createWatchlist = function(sid, watchlistName) {
    if (!isValidWatchlistName(watchlistName)) {
        return {error: 'watchlist-name-invalid'};
    }
    const nextWatchlistsId = users[sessions[sid]["username"]].nextWatchlistsId++;
    users[sessions[sid]["username"]].watchlists[nextWatchlistsId] = {
        name: watchlistName,
        stocks: [],
        id: nextWatchlistsId
    }
    return {};
}

const addWatchlistStock = function(sid, watchlistName, symbol) {
    let watchlistId = -1;
    Object.values(users[sessions[sid]["username"]].watchlists).forEach((val, index) => {
        if (val.name === watchlistName) {
            users[sessions[sid]["username"]].watchlists[val.id].stocks[symbol] = {
                symbol,
                price: 0,
                change: 0,
            };
            watchlistId = val.id;
        }
    })
    return watchlistId;
}

const getWatchlistStocks = function(sid, watchlistId) {
    return users[sessions[sid]["username"]].watchlists[watchlistId].stocks;
}

const deleteWatchlistStock = function(sid, watchlistId, symbol) {
    delete users[sessions[sid]["username"]].watchlists[watchlistId].stocks[symbol];
}

const deleteWatchlist = function(sid, watchlistId) {
    delete users[sessions[sid]["username"]].watchlists[watchlistId];
}

const getPosts = function() {
    return posts;
}

const addPost = function(sid, msg) {
    const newPost = {
        username: sessions[sid]["username"],
        msg,
        timestamp: new Date(),
        id: nextPostId++,
        like: 0,
        dislike: 0,
    };
    posts.push(newPost);
    return newPost
}

const likePost = function(id) {
    posts.forEach((post, index) => {
        if (post.id == id) {
            post.like++;
            posts[index] = post;   
        }
    });
}

const dislikePost = function(id) {
    posts.forEach((post, index) => {
        if (post.id == id) {
            post.dislike++;
            posts[index] = post;   
        }
    });
}

const session = {
    create,
    remove,
    isValid,
    getUser,
    createWatchlist,
    deleteWatchlist,
    getPosts,
    addPost,
    likePost,
    dislikePost,
    addWatchlistStock,
    getWatchlistStocks,
    deleteWatchlistStock,
};

module.exports = session;