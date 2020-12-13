import {useState} from 'react';
import { addPost } from "./services";

const NewPost = function(props) {
    const [msg, setMsg] = useState('');

    const textChange = (e) => {
        setMsg(e.target.value);
    }

    const add = () => {
        addPost(msg)
        .then((newPost) => {
            props.add(newPost);
            setMsg('');
        });
    }

    return (
        <div className='newpost'>
            <textarea className='post-input' rows="5" value={msg} onChange={textChange} autocomplete='on'></textarea>
            <button className='post-bt' onClick={add}>Post</button>
        </div>
    );
}

export default NewPost;