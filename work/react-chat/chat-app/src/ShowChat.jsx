import MessagePanel from './MessagePanel';
import UserPanel from './UserPanel';
import AddMessage from './AddMessage';

const ShowChat = function({currentUser, users, messages, onAddMessage}) {
    return (
       <div className="chat-app">
          <div className="display-panel">
            <MessagePanel messages={messages} currentUser={currentUser}/>
            <UserPanel users={users} currentUser={currentUser}/>
          </div>
          <AddMessage onAddMessage={onAddMessage}/>
       </div>
    );
};

export default ShowChat;