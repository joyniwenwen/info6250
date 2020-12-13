import { useState, useEffect } from 'react';
import {getQuote} from './services';
import Posts from './Posts';

const Home = function() {
    const [marketIndicesQuotes, setMarketIndicesQuotes] = useState([]);

    useEffect( () => {
        const marketIndices = ['SPY', 'DIA', 'QQQ'];
        getQuote(marketIndices)
            .then( (quotes) => {
                const newIndicesQuotes = quotes.map((quote, index) => {
                    return {symbol: marketIndices[index], price: quote.c, prevClose: quote.pc}
                });
                setMarketIndicesQuotes(newIndicesQuotes);
            })
      }, []);

    return (
        <div className="home">
            <div className="indexes-panel">
                {marketIndicesQuotes.map((quote) => {
                    const changeDiff = (quote.price - quote.prevClose).toFixed(2);
                    const changePercent = (changeDiff/quote.prevClose*100).toFixed(2);
                    const changeStr = `(${changePercent}%)`;
                    return <div className='index-quote'>
                        <div className='symbol'>
                            {quote.symbol}
                        </div>
                        <div className='price'>
                            {quote.price}
                            <div className={changePercent > 0 ? 'percent inc' : 'percent dec' }>
                                {changeDiff + changeStr}
                            </div>
                        </div>
                    </div>;
                }) }
            </div>
            <div className="posts-panel">
                <Posts />
            </div>
        </div>
    );
}

export default Home;