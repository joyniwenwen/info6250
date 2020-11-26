import './App.css';
import {checkSession, endSession, getMessagesAndUsers} from './services';
import { useState, useEffect } from 'react';
import Nav from './Nav';
import ShowChat from './ShowChat';
import Login from './Login';

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });

  useEffect( () => {
    checkSession()
    .then( ({currentUser, users, messages}) => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
        currentUser,
        users,
        messages,
      });
    })
    .catch( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    });
  }, []);

  // Polling to update users and messages list.
  useEffect( () => {
    function updateMessagesAndUsersPeriodically() {
      getMessagesAndUsers()
      .then( ({currentUser, users, messages}) => {
        setUserState({
          isLoggedIn: true,
          isPending: false,
          currentUser,
          users,
          messages,
        });
      })
      .then(setTimeout(updateMessagesAndUsersPeriodically, 5000));
    }

    updateMessagesAndUsersPeriodically();
  },[]);

  const login = function({currentUser, users, messages}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      currentUser,
      users,
      messages,
    });
  };

  const logout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
    .then(() => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    })
    .catch(() => {
      setUserState({
        ...userState,
        isPending: false,
      });
    });
  };

  const addMessage = function(message){
    const newMessages = userState.messages;
    newMessages.push(message);
    setUserState({
      ...userState,
      messages: newMessages,
    });
  };

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  let content;
  if (userState.isLoggedIn) {
    content = <ShowChat currentUser={userState.currentUser} users={userState.users} messages={userState.messages} onAddMessage={addMessage}/>;
  } else {
    content = <Login onLogin={login}/>;
  }

  return (
    <div className="app">
      <div className="app-title">
        <h1>Chat App</h1>
      </div>
      <Nav user={userState} onLogout={logout}/>
      {content}
    </div>
  );
}

export default App;
