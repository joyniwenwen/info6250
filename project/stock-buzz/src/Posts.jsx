import {getPosts} from './services';
import {useState, useEffect} from 'react';
import Post from './Post';
import { likePost, dislikePost } from "./services";
import NewPost from './NewPost';

const Posts = function() {
    const [posts, setPosts] = useState([]);

    const addLike = (postId) => {
        likePost(postId)
        .then(
            () =>  {
                posts.forEach((post, index) => {
                    if (post.id.toString() === postId.toString()) {
                        post.like++;
                        posts[index] = post;   
                    }
                });
                setPosts([...posts]);
            }
        );
    }

    const addDislike = (postId) => {
        dislikePost(postId)
        .then(
            () =>  {
                posts.forEach((post, index) => {
                    if (post.id.toString() === postId.toString()) {
                        post.dislike++;
                        posts[index] = post;   
                    }
                });
                setPosts([...posts]);
            }
        );
    }

    const ops = {
        addLike,
        addDislike
    }

    const add = (post) => {
        posts.push(post);
        setPosts([...posts]);
    }

    useEffect( () => {
        getPosts()
        .then((userPosts) => {
            setPosts(userPosts);
        });
    }, []);

    return (
        <div className='posts'>
            <div className='existing-posts'>
                {posts.map((post) => <Post post={post} ops={ops}/>)}
            </div>
            <NewPost add={add} />
        </div>
    );
}

export default Posts;