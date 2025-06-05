export function renderApp(state) {
    if (!state.loggedIn) {
      return `
        <div class="container">
          ${renderError(state.errorMessage)}
          <h2>Login</h2>
          <form id="login-form">
            <div class="form-group">
              <label for="login-username">Enter username:</label>
              <input type="text" id="login-username" name="username" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      `;
    } else {
      return `
          <div class='navigation'>
            <h2>Welcome, ${state.username}!</h2>
            <button id="logout-btn">Logout</button>
          </div>

          <div class="chat-container">
            <div class="user-block">
              <div id="user-list-section">
                ${renderUserList(state)}
              </div>
              
              <label for="channel-select">Channel:</label>
              <select id="channel-select">
                ${state.channels.map(ch => `
                  <option value="${ch}" ${ch === state.currentChannel ? 'selected' : ''}>${ch}</option>
                `).join('')}
              </select>

            </div>
            
            <div class="chat-block">
              <div id="message-list-section">
                  ${renderMessageList(state)}
              </div>

              <form id="chat-form">
                ${renderError(state.errorMessage)}
                <div class="form-group">
                  <label for="chat-text">Type a message:</label>
                  <input type="text" id="chat-text" name="text" />
                </div>
                <button type="submit">Send</button>
              </form>
            </div>
        </div>
      `;
    }
}

export function renderUsersAndMessages(state) {
const userListHTML = renderUserList(state);
const messageListHTML = renderMessageList(state);
return { userListHTML, messageListHTML };
}

function renderError(errorMsg) {
if (!errorMsg) {
    return '';
}
return `<div class="error">${errorMsg}</div>`;
}

function renderUserList(state) {
return `
    <div class="user-list">
    <h3>Users Online</h3>
    <ul>
        ${state.users.map(u => `<li>${u}</li>`).join('')}
    </ul>
    </div>
`;
}

function renderMessageList(state) {
return `
    <div class="message-list">
    ${state.messages.map(renderMessage).join('')}
    </div>
`;
}

function renderMessage(msg) {
return `
    <div class="message-item">
      <strong class="author">${msg.author}:</strong>
      <div class="message-text">${msg.text}</div>
    </div>

`;
}  