// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatView = {
  chatPage(model) {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Express Chat</title>
        <!-- Load static CSS -->
        <link rel="stylesheet" href="chat.css" />
      </head>
      <body>
        <div id="chat-app">
          ${chatView.getUserList(model)}
          ${chatView.getMessageList(model)}
          ${chatView.getSendMessageForm(model)}
        </div>
      </body>
      </html>`;
  },

  getUserList(model) {
    // Build a <ul> of users
    // The object keys are the usernames
    // The object values contain avatar or are empty
    const allUsernames = Object.keys(model.users);
    const userItems = allUsernames.map((user) => {
      return `
        <li>
          <div class="user">
            <span class="username">${user}</span>
          </div>
        </li>
      `;
    }).join('');

    return `

      <div class="users-list">
        <div>User List:</div> 
        <ul class="users">
          ${userItems}
        </ul>
      </div>
    `;
  },

  getMessageList(model) {
    // Build an <ol> of all messages
    // Check if a user has an avatar. If not, show a default
    const defaultAvatar = 'images/avatar-default.png';
    const messageItems = model.messages.map((msg) => {
      const { sender, text, createdAt} = msg;
      const userInfo = model.users[sender] || {};
      const avatarToShow = userInfo.avatar ? userInfo.avatar : defaultAvatar;
      const altText = `avatar of ${sender.toLowerCase()}`; // Lowercase alt text

      const dateString = msg.date 
        ? new Date(msg.date).toLocaleString() : '(no date)';

      return `
        <li>
          <div class="message">
            <div class="sender-info">
              <img class="avatar" alt="${altText}" src="${avatarToShow}" />
              <span class="username">${sender}</span>
            </div>
            <div class="message-details">
            <p class="message-text">${text}</p>
            <span class="timestamp">${dateString}</span>
          </div>
          </div>
        </li>
      `;
    }).join('');

    return `
      <ol class="messages">
        ${messageItems}
      </ol>
    `;
  },

  getSendMessageForm(model) {
    // A <form> that POSTs to chat
    // Contains a select with all known users as options
    // Contains a text field named "text"
    const allUsernames = Object.keys(model.users);

    const options = allUsernames.map((user) => {
      return `<option value="${user}">${user}</option>`;
    }).join('');

    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <label for="username">Username:
            <select name="username" id="username">
              ${options}
            </select>
          </label>
          <label for="text">Message:
            <input type="text" name="text" id="text" />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  },
};

module.exports = chatView;