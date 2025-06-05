export function makeAPI() {
    function checkStatus(response) {
      if (!response.ok) {
        return response.json().then((err) => {
          return Promise.reject(err);
        });
      }
      return response.json();
    }
  
    function fetchSession() {
      return fetch('/api/v1/session', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(checkStatus);
    }
  
    function login(username) {
      return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
      .then(checkStatus);
    }
  
    function logout() {
      return fetch('/api/v1/session', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(checkStatus);
    }
  
    function fetchMessages(channel, sinceId) {
      let url = `/api/v1/messages?channel=${encodeURIComponent(channel)}`;
      if (sinceId) {
        url += `&sinceId=${encodeURIComponent(sinceId)}`;
      }
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(checkStatus);
    }
  
    function sendMessage(text, channel) {
      return fetch('/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ text, channel }),
      })
      .then(checkStatus);
    }
  
    function fetchUsers() {
      return fetch('/api/v1/users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(checkStatus);
    }
  
    function fetchChannels() {
      return fetch('/api/v1/channels', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(checkStatus);
    }
  
    return {
      fetchSession,
      login,
      logout,
      fetchMessages,
      sendMessage,
      fetchUsers,
      fetchChannels,
    };
}