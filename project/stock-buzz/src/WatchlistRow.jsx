import stockDownImg from './assets/stock-down.png';
import stockUpImg from './assets/stock-up.png';
import stockDeleteImg from './assets/delete-stock.png';
import {getQuote} from './services';
import { useEffect, useState } from 'react';

const WatchlistRow = function({stock, watchlistId, deleteStock, commonOps}) {
    const [curStock, setCurStock] = useState({...stock, price: 0, change: 0});
    const deleteCurrentStock = () => {
        deleteStock(watchlistId, stock.symbol);
    }

    useEffect( () => {
        getQuote([stock.symbol])
        .then( (quotes) => {
            setCurStock({...stock, price: quotes[0].c, change: quotes[0].c - quotes[0].pc});
          })
        .catch((e) => commonOps.setError(e.error));
    }, [stock, commonOps]);

    return ( 
        <li>
            <div className="stock-row">
                <div className="symbol">
                    <span>{curStock.symbol}</span>
                </div>
                <div className="price">
                    <span>{curStock.price}</span>
                </div>
                <div className="change">
                    <span>{curStock.change.toFixed(2) + "(" + (curStock.change/(curStock.price - curStock.change) * 100).toFixed(2) + "%)"}</span>
                    <img alt='stock down' src={curStock.change > 0 ? stockUpImg : stockDownImg } className='stock-direction'/>
                </div>
                <div className="action">
                    <img alt='stock up' src={stockDeleteImg} className="delete-stock-img" onClick={deleteCurrentStock}/>
                </div>
            </div>
        </li>
    );
}

export default WatchlistRow;