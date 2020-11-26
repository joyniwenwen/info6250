const MessagePanel = function({currentUser, messages}) {
  const convertTimeToReadable = function (timestamp) {
    const date = new Date(Date.parse(timestamp));
    return date.toString();
  }

  return (
        <ol className='messages'>
           {messages.map(
               (message) => <li  key={message.id}>
               <div className={message.sender===currentUser?"message self": "message"}>
                   <div className="sender-info">
                     <span className="sendername">{message.sender===currentUser ?currentUser+'(You)':message.sender}</span>
                     <hr></hr>
                     <span className="sendtime">{convertTimeToReadable(message.timestamp)}</span>
                   </div>
                    <p>{message.text}</p>
               </div>
             </li>
           )}
       </ol>
    );
};

export default MessagePanel;