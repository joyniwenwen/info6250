import {useState} from 'react';
import ResultMessage from './ResultMessage';
import './game-style.css';

const GuessGame = () => {
    const [text, setText] = useState('');
    const updateText = (e) => setText(e.target.value);
    const [userGuess, setUserGuess] = useState('');
    return (
        <div className="guess-game">
            <div className="title">
                <h1>Welcome To Guess Game</h1>
            </div>
            <ResultMessage userGuess={userGuess}/>
            <div className='operation-panel'>
                <input onChange={ updateText } value={text}/>
                <button onClick={() => {setUserGuess(text); setText('');}}  disabled={text.length === 0} >Guess</button>
                <button onClick={() => {setUserGuess('');}} >Restart</button>
            </div>
        </div>
    );

};

export default GuessGame;