import './App.css';
import { useEffect, useState } from 'react';
import {checkSession, endSession, addStockToWatchlist, deleteStockFromWatchlist, createWatchlist, removeWatchlist} from './services';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Watchlists from './Watchlists';
import BrowseStock from './BrowseStock';
import errors from './errors.js';

function App() {
  const [userState, setUserState] = useState({isLoggedIn: false, isPending: true, userInfo: {}});
  const [navId, setNavId] = useState(0);
  const [status, setStatus] = useState('');

  useEffect( () => {
    checkSession()
    .then( (userInfo) => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
        userInfo,
      });
      setStatus('');
    })
    .catch( (e) => {
      setStatus(e);
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    });
  }, []);

  const login = function(userInfo) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      userInfo,
    });
  };

  const logout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
    .then((val) => {
      setStatus('');
      setUserState({
        ...userState,
        isLoggedIn: false,
        isPending: false,
      });
    })
    .catch((e) => {
      setStatus(e);
      setUserState({
        ...userState,
        isLoggedIn: false,
        isPending: false,
      });
    });
  };

  const addStock = function(watchlistName, stockSymbol){
    setUserState({
      ...userState,
      isPending: true,
    });
    const userInfo = userState.userInfo;
    let watchlistId = -1;
    Object.values(userInfo.watchlists).forEach((val) => {
      if (val.name === watchlistName) {
        watchlistId = val.id;
      }
    })
    if (watchlistId >= 0) {
      addStockToWatchlist(watchlistName, stockSymbol)
      .then(
        () => {
          setStatus('');
          userInfo.watchlists[watchlistId].stocks[stockSymbol] = {
            symbol: stockSymbol,
            price: 0,
            change: 0,
          }
          setUserState({
            isLoggedIn: true,
            isPending: false,
            userInfo: {
              ...userInfo,
            },
          });
        }
      )
      .catch((e) => {
        setStatus(e.error);
        setUserState({
          ...userState,
          isPending: false,
        });
      });
    }
  }

  // Watchlist ops
  const deleteStock = function(watchlistId, stockSymbol){
    setUserState({
      ...userState,
      isPending: true,
    });
    if (watchlistId >= 0) {
      deleteStockFromWatchlist(watchlistId, stockSymbol)
      .then(() => {
        setStatus('');
        const userInfo = userState.userInfo;
        delete userInfo.watchlists[watchlistId].stocks[stockSymbol];
        setUserState({
          isLoggedIn: true,
          isPending: false,
          userInfo: {
            ...userInfo,
          },
        });
      })
      .catch(
        (e) =>  setStatus(e.error)
      );
    }

  }

  const addWatchlist = (name) => {
    setUserState({
      ...userState,
      isPending: true,
    });

    if (name === '') {
      return;
    }
    createWatchlist(name)
    .then((res) => {
      const userInfo = userState.userInfo;
      const nextId = userState.userInfo.nextWatchlistsId++;
      userInfo.watchlists[nextId] = {
        name,
        stocks: [],
        id: nextId,
      }
      
      setUserState({
        isLoggedIn: true,
        isPending: false,
        userInfo: {
          ...userInfo,
        },
      });
      setStatus('');
    })
    .catch((e) => {
      setUserState({
        ...userState,
        isPending: false,
      });
      setStatus(e.error);
    })
  }

  const deleteWatchlist = (id) => {
    setUserState({
      ...userState,
      isPending: true,
    });
    removeWatchlist(id)
    .then(() => {
      setStatus('');
      const userInfo = userState.userInfo;
      delete userInfo.watchlists[id];
      setUserState({
        isLoggedIn: true,
        isPending: false,
        userInfo: {
          ...userInfo,
        },
      });
    })
    .catch((e) => {
      setUserState({
        ...userState,
        isPending: false,
      });
      setStatus(e.error);
    });

  }

  const selectPage = (navId) => {
    setNavId(navId);
  }


  const watchlistOps = {
    addWatchlist,
    deleteWatchlist,
    deleteStock,
    addStock,
  }

  const setError = (e) => {
    setStatus(e);
  }

  const commonOps = {
    setError,
  }

  let content;

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  if (userState.isLoggedIn) {
    if (navId.toString() === "0") {
      content = <Home />
    }
    if (navId.toString() === "1") {
      content = <Watchlists user={userState} watchlistOps={watchlistOps} commonOps={commonOps}></Watchlists>;
    }
    if (navId.toString() === "2") {
      content = <BrowseStock user={userState} watchlistOps={watchlistOps} commonOps={commonOps}/>
    } 
  } else {
    content = <Login onLogin={login} commonOps={commonOps}/>;
  }

  return (
    <div className="app">
      <Nav user={userState} selectPage={selectPage} onLogout={logout}></Nav>
      {content}
      <div className='status'> 
        {errors[status]}
      </div>
    </div>
  );
}

export default App;
