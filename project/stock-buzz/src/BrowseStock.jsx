import { useState, useEffect } from 'react';
import {getIncomeStatement, getPriceHistory} from './services';
import Plot from './Plot';
import commarize from './commarize';
import {augmentWithYOYGrowth} from './incomeStatements.js';

const BrowseStock = function({user, watchlistOps, commonOps}) {
    const [financialStatement, setFinancialStatement] = useState([]);
    const [priceHistory, setPriceHistory] = useState([]);
    const [symbol, setSymbol] = useState('TSLA');
    const [selectedList, setSelectedList] = useState('');
    
    const getFinancialPlotConfig = (input, yName) => {
        return {
            type: 'bar',
            data: {
                labels: input.map(o => new Date(Date.parse(o["date"])).getFullYear().toString().substr(-2)),
                datasets:[{
                        label: yName,
                        data: input.map(o => o[yName]),
                        showLine: true,
                        yAxisID: yName,
                    },
                    {
                        type: 'line',
                        label: "yoy",
                        data: input.map(o => {
                        if (o["yoy"] && o["yoy"][yName]) {
                            return o["yoy"][yName];
                        }
                        return undefined;
                        }),
                        borderColor: '#FF0000',
                        backgroundColor: '#ffffff00',
                        showLine: true,
                        yAxisID: "yoy",
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Report Year",
                            fontSize: 15,
                        },
                    }],
                    yAxes: [{
                        id: yName,
                        position: 'left',
                        type: 'linear',
                        scaleLabel: {
                        display: true,
                        labelString: yName,
                        fontSize: 15,
                        },
                        gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                            return commarize(value);
                            },
                            suggestedMin: 10,
                            suggestedMax: 10,
                        }
                    },
                    {
                        id: 'yoy',
                        position: 'right',
                        type: 'linear',
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'yoy',
                            fontSize: 15,
                        },
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        }  
    };

    const getPricePlotConfig = (input, yName) => {
        return {
            type: 'line',
            data: {
                labels: input["t"] ?input["t"].map((val) => {
                    let date = new Date(val * 1000);
                    return date.toLocaleDateString('en-US', {month: 'short', day: "2-digit"});
                }) : input["t"],
                datasets:[{
                        label: yName,
                        data: input["c"],
                        showLine: true,
                        yAxisID: yName,
                        borderColor: '#FF0000',
                        backgroundColor: '#ffffff00',
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Date",
                            fontSize: 15,
                        },
                    }],
                    yAxes: [{
                            id: yName,
                            position: 'left',
                            type: 'linear',
                            scaleLabel: {
                            display: true,
                            labelString: yName,
                            fontSize: 15,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                            return commarize(value);
                            },
                            suggestedMin: 10,
                            suggestedMax: 10,
                        }
                    }]
                }
            }
        }  
    };

    const onInputSymbol = (e) => {
        setSymbol(e.target.value);
    }

    const onChangeSymbol = () => {
        const cleanSymbol = symbol.replace(/[^a-zA-Z0-9_\-]/g, '');
        if (symbol !== cleanSymbol) {
            commonOps.setError('invalid stock symbol');
            return;
        }
        getIncomeStatement(symbol)
        .then((val) =>{
            commonOps.setError('');
            const newStatement = augmentWithYOYGrowth(val.reverse())
            setFinancialStatement(newStatement)
        })
        .catch((e) => {
            commonOps.setError(e.error);
        })
        getPriceHistory(symbol).then((val) => {
            setPriceHistory(val);
        })
    }

    const addToWatchlist = () => {
        watchlistOps.addStock(selectedList, symbol);
    }

    useEffect(() => {
        getIncomeStatement(symbol)
        .then((val) =>{
            commonOps.setError('');
            const newStatement = augmentWithYOYGrowth(val.reverse())
            setFinancialStatement(newStatement)
        })
        .catch((e) => {
            commonOps.setError(e.error);
        })
        getPriceHistory(symbol).then((val) => {
            setPriceHistory(val);
        })
    }, []);

    const onChangeWatchlist = (e) => {
        setSelectedList(e.currentTarget.value);
    }

    return (
        <div className="browse-stock">
             <div className='control'>
                <input value={symbol} onChange={onInputSymbol}></input>
                <button onClick={onChangeSymbol}>Check</button>
             </div>
             <div className="price-history">
                <Plot chartConfig={getPricePlotConfig(priceHistory, "Price")}/>
             </div>
             <div className="fundamentals">
                <Plot chartConfig={getFinancialPlotConfig(financialStatement, "revenue")}/>
                <Plot chartConfig={getFinancialPlotConfig(financialStatement, "grossProfit")}/>
            </div>
            <div className='add-to-watchlist'>
                 Add to
                <select onChange={onChangeWatchlist}>
                    <option></option>
                    {Object.values(user.userInfo.watchlists).map((value) => <option value={value.name}>{value.name}</option>)}
                </select>
                <button onClick={addToWatchlist}>Go!</button>
             </div>
        </div>
    );
}

export default BrowseStock;