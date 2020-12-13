export const checkSession = () => {
    return fetch('/api/session',  {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then( response => {
      if(response.ok) {
        return response.json();
      }
      return response.json().then( json => Promise.reject(json) );
    });
  };

export const createSession = ({username}) => {
  return fetch('/api/session',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const endSession = () => {
  return fetch('/api/session',  {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};


export const createWatchlist = (name) => {
  return fetch('/api/watchlist',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ name }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const removeWatchlist = (id) => {
  return fetch('/api/watchlist',  {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ id }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const addStockToWatchlist = (watchlistName, stockSymbol) => {
  return fetch('/api/watchlistStock',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ watchlistName, stockSymbol }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const deleteStockFromWatchlist = (watchlistId, stockSymbol) => {
  return fetch('/api/watchlistStock',  {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ watchlistId, stockSymbol }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const getQuote = (symbols) => {
  return fetch('/api/stockQuotes',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ symbols }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const getPosts = () => {
  return fetch('/api/posts',  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const addPost = (msg) => {
  return fetch('/api/posts',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ msg }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const likePost = (id) => {
  return fetch('/api/likepost',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ id }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const dislikePost = (id) => {
  return fetch('/api/dislikepost',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ id }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const getPriceHistory = (symbol) => {
  return fetch(`/api/priceHistory/${symbol}`,  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}

export const getIncomeStatement = (symbol) => {
  return fetch(`/api/incomeStatement/${symbol}`,  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
}
