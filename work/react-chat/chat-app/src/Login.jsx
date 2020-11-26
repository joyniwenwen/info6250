import { createSession } from "./services";
import {useState} from 'react';
import errors from './errors.js';

const Login = function({ onLogin }) {
    const [username, setUsername] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [status, setStatus] = useState('');

    const onChange = (e) => {
        setStatus('');
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    }

    const login = () => {
        setIsPending(true);
        createSession({username})
        .then(({currentUser, users, messages}) => {
            onLogin({currentUser, users, messages});
            setStatus('');
            setIsPending(false);
        })
        .catch(err => {
            setStatus(err.error);
            setIsPending(false);
        });
    };

    return (
        <div className='login-screen'>
            <h2>Login</h2>
            <form>
                <div className='login-box'>
                    <input onChange={onChange} className='username-input' placeholder='Type in your username' disabled={isPending} value={username}/>
                    <br></br>
                    <button onClick={login} className='login-button' disabled={isDisabled || isPending}>{isPending? "..." : "Login"}</button>
                </div>
                <div className='status'> 
                    {errors[status]}
                </div>
            </form>
        </div>
    );


};

export default Login;