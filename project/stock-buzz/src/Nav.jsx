import logoImg from './assets/logo.png';

const Nav = function({user, selectPage, onLogout}) {
    if(!user.isLoggedIn) {
        return null;
    }

    const clickNav = (e) => {
        if (!e.target.dataset) {
            return;
        }
        selectPage(e.target.dataset['id']);
    }

    return (
       <nav>
           <ul className="nav" onClick={clickNav}>
               <li> <img alt='logo img' src={logoImg} className='logo-img'/></li>
               <li><a href="#Home" data-id={0}>Home</a></li>
               <li><a href="#watchlist" data-id={1}>Stock WatchLists</a></li>
               <li><a href="#browsestock" data-id={2}>Browse Stock</a></li>
               <li><a href="#logout" data-id={3} onClick={onLogout}>Logout</a></li>
           </ul>
       </nav> 
    );
};

export default Nav;