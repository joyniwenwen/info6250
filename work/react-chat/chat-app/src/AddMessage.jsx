import {useState} from 'react';
import {addMessage} from './services';

const AddMessage = function({username, onAddMessage}) {
    const [message, setMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const onChange = (e) => {
        setMessage(e.target.value);
        setIsDisabled(!e.target.value);
    }

    const sendMessage = () => {
        setIsPending(true);
        addMessage(message)
        .then((message) => {
            onAddMessage(message);
            setMessage('');
            setIsPending(false);
            setIsDisabled(true);
        });
    };

    return (
        <div className="addmessage">
            <form>
                <input onChange={onChange} className="messagetosend" name="text" value={message} placeholder='Type your message'></input>
                <button onClick={sendMessage} className="sendbutton" type="submit" disabled={isPending || isDisabled}>Send</button>
            </form>
        </div>  
    );
};

export default AddMessage;