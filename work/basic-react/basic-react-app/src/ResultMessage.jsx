import compare from './compare';
import './game-style.css';

const ResultMessage = ( {userGuess} ) => {
    const desiredStringLength = 5;
    const secretWord = "RECAT";
    const getResultMessage = () => {
        if (userGuess.length === 0) {
            return 'Please type in your guess';
        }
        if (userGuess.length !== desiredStringLength) {
            return userGuess.concat(" was not a valid word!");
        }
        if (userGuess.toLowerCase() === secretWord.toLowerCase()) {
            return userGuess.concat(" is the secret word!", );
        }
        const commonLetters = compare(userGuess, secretWord);
        return userGuess.concat(" had ", commonLetters, " letters in common");
    };

    return (
        <div className='message'>
            <p>{getResultMessage()}</p>
        </div>
    );
};

export default ResultMessage;