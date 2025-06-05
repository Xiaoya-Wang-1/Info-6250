import { renderApp, renderUsersAndMessages } from './view.js';

export function setupController(rootElement, state, api) {
  let pollIntervalId = null;

  function doFullRender() {
    rootElement.innerHTML = renderApp(state);
    attachEventHandlers();
  }

  function doPartialRender() {
    const sections = renderUsersAndMessages(state);
    const userListSection = document.querySelector('#user-list-section');
    const messageListSection = document.querySelector('#message-list-section');
    if (userListSection) {
      userListSection.innerHTML = sections.userListHTML;
    }
    if (messageListSection) {
      messageListSection.innerHTML = sections.messageListHTML;
    }
  }

  function attachEventHandlers() {
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', onLoginSubmit);
    }

    const logoutBtn = document.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', onLogout);
    }

    const chatForm = document.querySelector('#chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', onChatSubmit);
    }

    const channelSelect = document.querySelector('#channel-select');
    if (channelSelect) {
      channelSelect.addEventListener('change', onChangeChannel);
    }
  }


  function onLoginSubmit(e) {
    e.preventDefault();
    const usernameInput = document.querySelector('#login-username');
    const username = usernameInput.value.trim();

    state.errorMessage = '';
    state.loading = true;
    doFullRender();

    api.login(username)
      .then((info) => {
        state.loggedIn = true;
        state.username = info.username;
        return loadInitialData();
      })
      .catch((err) => {
        state.errorMessage = err?.error || 'Unknown error';
      })
      .finally(() => {
        state.loading = false;
        doFullRender();
      });
  }

  function onLogout() {
    state.errorMessage = '';
    state.loading = true;
    doFullRender();

    api.logout()
      .then(() => {
        if (pollIntervalId) {
          clearInterval(pollIntervalId);
          pollIntervalId = null;
        }
        state.loggedIn = false;
        state.username = '';
        state.messages = [];
        state.users = [];
        state.lastMessageId = 0;
      })
      .catch((err) => {
        state.errorMessage = err?.error || 'Error logging out';
      })
      .finally(() => {
        state.loading = false;
        doFullRender();
      });
  }

  function onChatSubmit(e) {
    e.preventDefault();
    const textInput = document.querySelector('#chat-text');
    const text = textInput.value;

    state.errorMessage = '';
    state.loading = true;
    
    doFullRender();

    api.sendMessage(text, state.currentChannel)
      .then(() => {
        textInput.value = '';
        return refreshMessages();
      })
      .catch((err) => {
        state.errorMessage = err?.error || 'Error sending message';
      })
      .finally(() => {
        state.loading = false;
        doFullRender();
      });
  }

  function onChangeChannel(e) {
    const newChannel = e.target.value;
    state.currentChannel = newChannel;
    state.messages = [];
    state.lastMessageId = 0;
    refreshMessages().then(() => {
      doPartialRender();
    });
  }

  function startPolling() {
    if (pollIntervalId) {
      clearInterval(pollIntervalId);
    }
    pollIntervalId = setInterval(() => {
      if (!state.loggedIn) {
        return;
      }
      Promise.all([ refreshMessages(), refreshUsers() ])
        .then(() => {
          doPartialRender();
        });
    }, 5000);
  }

  function loadInitialData() {
    return Promise.all([
      api.fetchChannels(),
      refreshMessages(),
      refreshUsers(),
    ]).then(([channelData]) => {
      state.channels = channelData.channels || [];
      startPolling();
    }).catch((err) => {
      state.errorMessage = err?.error || 'Error loading data';
    });
  }

  function refreshMessages() {
    return api.fetchMessages(state.currentChannel, state.lastMessageId)
      .then((fetched) => {
        if (!fetched.messages) return;
        fetched.messages.forEach(msg => {
          state.messages.push(msg);
          if (msg.id > state.lastMessageId) {
            state.lastMessageId = msg.id;
          }
        });
      })
      .catch((err) => {
        state.errorMessage = err?.error || 'Error fetching messages';
      });
  }

  function refreshUsers() {
    return api.fetchUsers()
      .then((fetched) => {
        state.users = fetched.users || [];
      })
      .catch((err) => {
        state.errorMessage = err?.error || 'Error fetching users';
      });
  }

  function checkSession() {
    api.fetchSession()
      .then((info) => {
        state.loggedIn = true;
        state.username = info.username;
        return loadInitialData();
      })
      .finally(() => {
        doFullRender();
        document.body.classList.add('app-visible');
      });
  }

  checkSession();
}