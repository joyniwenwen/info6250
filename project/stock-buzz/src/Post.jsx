import likeImg from './assets/like.png';
import dislikeImg from './assets/dislike.png';

const Post = function({post, ops}) {
    const formatPostTime = (postTimestamp) => {
        const currentTime = Date.now();
        const postTime = Date.parse(postTimestamp);
        let durationSecs = (currentTime - postTime)/1000;

        if (durationSecs > 86400) {
            const date = new Date(postTime);
            let options = {year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleString("en-US", options);
        }
        let result = '';
        durationSecs = Math.floor(durationSecs % 86400);
        const hrs = (durationSecs/3600).toFixed(0);
        if (hrs > 0) {
            result += hrs + 'h';
        }
        durationSecs = Math.floor(durationSecs % 3600);
        const mins = Math.floor(durationSecs / 60);
        if (mins > 0) {
            result += mins + 'm';
        }
        durationSecs = Math.floor(durationSecs % 60);
        if (durationSecs > 0) {
            result += durationSecs + 's';
        }
        if (!result) {
            result += '0s';
        }
        result += ' ago';
        return result;
    }

    const addLike = () => {
        ops.addLike(post.id);
    }

    const addDislike = () => {
        ops.addDislike(post.id);
    }

    return (
        <div className='post'>
            <div className='title'>
                <div className='user'>
                    {post.username}
                </div>
                <div className='time'>
                    {formatPostTime(post.timestamp)}
                </div>
            </div>
            <div className='message'>
                {post.msg}
            </div>
            <div className='feedback'>
                <div className='expression'>
                    <div className='like-section'>
                        <img alt='like img' src={likeImg} className='like' onClick={addLike}/>
                        {post.like}
                    </div>
                    <div className='dislike-section'>
                        <img alt='dislike img' src={dislikeImg} className='dislike' onClick={addDislike}/>
                        {post.dislike}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Post;