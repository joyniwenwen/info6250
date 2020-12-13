import { useState } from 'react';
import WatchlistRow from './WatchlistRow';
import addWatchlistImg from './assets/add-watchlist.png';
import deleteImg from './assets/delete-stock.png';

const Watchlists = function({user, watchlistOps, commonOps}) {
    const [selectedWatchlistId, setSelectedWatchlistId] = useState(-1);
    const [newWatchlistName, setNewWatchlistName] = useState('');

    const clickWatchlist = (e) => {
        if (e.target.className.includes('watchlist-span')) {
            setSelectedWatchlistId(e.target.dataset['watchlistId']);
            return;
        }
        if (e.target.className.includes('delete-watchlist-img')) {
            const id = e.target.dataset['watchlistId'];
            watchlistOps.deleteWatchlist(id);
            setSelectedWatchlistId(-1);
            return;
        }
    }

    const addWatchlist = () => {
        watchlistOps.addWatchlist(newWatchlistName);
        setNewWatchlistName('');
    }

    const inputWatchlistName = (e) => {
        setNewWatchlistName(e.target.value);
        commonOps.setError('');
    }

    return (
        <div className="watchlists">
            <div className="watchlists-title">
                <div className="name">
                    My Watchlists
                </div>
            </div>
            <div className="watchlists-names"  onClick={clickWatchlist}>
                {
                    Object.keys(user.userInfo.watchlists).map((id) => {
                        return <div className="watchlist-name"> 
                                    <span className={(selectedWatchlistId.toString() === id.toString()) ? "watchlist-span selected" : "watchlist-span"} data-watchlist-id={id}>
                                        {user.userInfo.watchlists[id].name}
                                    </span>
                                    <div>
                                        <img src={deleteImg} alt="delete img" data-watchlist-id={id} className={(selectedWatchlistId.toString() === id.toString()) ? "delete-watchlist-img":"delete-watchlist-img hidden" }/>
                                    </div>
                               </div>;
                    })
                }
            </div>
            <div className="watchlist-operation-panel">
                <img alt='add img' onClick={addWatchlist} src={addWatchlistImg} className='add-watchlist'/>
                <form className="add-watchlist-form">
                    <input className='new-watchlist-name' alt="add img" value={newWatchlistName} onChange={inputWatchlistName} placeholder={'New Watchlist Name'}></input>
                </form>
            </div>
            <div className= "watchlist-row-title" >
                        <div className="watchlist-symbol-title">Symbol</div>
                        <div className="watchlist-price-title">Price</div>
                        <div className="watchlist-change-title">Change</div>
                        <div className="watchlist-action-title">Action</div>
            </div>
            <div className="watchlist-stocks">
                <ul>
                    {selectedWatchlistId < 0 ? '' : Object.values(user.userInfo.watchlists[selectedWatchlistId].stocks).map((stock, index) => <WatchlistRow stock={stock} deleteStock={watchlistOps.deleteStock} watchlistId={user.userInfo.watchlists[selectedWatchlistId].id} stockId={index} commonOps={commonOps}/>)}     
                </ul>
            </div>
        </div>
    );
}

export default Watchlists;