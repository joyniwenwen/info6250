const chatWeb = {
  chatPage: function(chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="/chat.css">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="chat-header">
              <div class="profile">
						    <h2>INFO-6250-Chatroom(100)</h2>
				      </div>
            </div>
            <div class="display-panel">
              ${chatWeb.getMessageList(chat)}
              ${chatWeb.getUserList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return (
      `<ol class="messages">` +
      chat.messages
      .map(
        (message) => `
        <li>
          <div class="message">
              <div class="sender-info">
                <span class="sendername">${message.sender}</span>
                <span class="sendtime">${message.timestamp}</span>
              </div>
						  <p>${message.text}</p>
          </div>
        </li>
      `
      )
      .join("") +
      `</ol>`
    );
  },
  getUserList: function(chat) {
    return (
      `<ul class="users">` +
      Object.values(chat.users)
      .map(
        (user) => `
      <li>
        <div class="user">
          <span class="sendername">${user}</span>
        </div>
      </li>
    `
      )
      .join("") +
      `</ul>`
    );
  },
  getOutgoing: function() {
    return `
      <div class="addmessage">
        <form action="/chat" method="POST">
          <input class="sendername" name="sender" value=joyniwenwen type="hidden"/>
          <input class="messagetosend" name="text" value="" placeholder="Type a message">
          <button class="sendbutton" type="submit">Send</button>
        </form>
      </div>
    `;
  },
};
module.exports = chatWeb;