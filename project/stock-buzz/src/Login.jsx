import { createSession } from "./services";
import {useState} from 'react';
import logoImg from './assets/logo.png';


const Login = function({ onLogin, commonOps }) {
    const [username, setUsername] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const onChange = (e) => {
        commonOps.setError('');
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    }

    const login = () => {
        setIsPending(true);
        createSession({username})
        .then((userInfo) => {
            onLogin(userInfo);
            commonOps.setError('');
            setIsPending(false);
        })
        .catch(err => {
            commonOps.setError(err.error);
            setIsPending(false);
        });
    };

    return (
        <div className='login-screen'>
            <div className='logo'>
                <img alt='logo img' src={logoImg} className='logo-img'/>
            </div>
            <form>
                <div className='login-box'>
                    <input onChange={onChange} className='username-input' placeholder='Type in your username' disabled={isPending} value={username}/>
                    <br></br>
                    <button onClick={login} className='login-button' disabled={isDisabled || isPending}>{isPending? "..." : "Login"}</button>
                </div>
            </form>
        </div>
    );


};

export default Login;