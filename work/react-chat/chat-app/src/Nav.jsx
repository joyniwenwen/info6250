import {useState} from 'react';

const Nav = function({user, onLogout}) {
    if(!user.isLoggedIn) {
        return null;
    }
    return (
       <nav>
           <ul className="nav">
               <li><a href="#logout" onClick={onLogout}>Logout</a></li>
           </ul>
       </nav> 
    );
};

export default Nav;