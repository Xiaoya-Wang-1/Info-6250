import {
    fetchSession, 
    fetchLogin,
    fetchLogout,
    fetchWord,
    updateWord
} from './services.js';

import {
  getState,
  login,
  logout,
  setStoredWord,
  setError,
  clearError
} from './model.js';

import { render } from './view.js';

export function addListeners() {
  const app = document.getElementById('app');

  app.addEventListener('click', (e) => {
    if(e.target.id === 'logout') {
      handleLogout();
      return;
    }
  });

  app.addEventListener('submit', (e) => {
    e.preventDefault();
    if(e.target.id === 'login-form') {
      const username = e.target.elements.username.value.trim();
      handleLogin(username);
      return;
    }
    if(e.target.id === 'word-form') {
      const word = e.target.elements.word.value;
      handleWordUpdate(word);
      return;
    }
  });
}

function handleLogin(username) {
  clearError();
  fetchLogin(username)
  .then((data) => {
    login(data.username);
    return fetchWord();
  })
  .then((data) => {
    setStoredWord(data.storedWord);
    render();
  })
  .catch((err) => {
    setError(err.error);
    render();
  });
}

function handleLogout() {
  fetchLogout()
  .then(() => {
    logout();
    render();
  })
  .catch((err) => {
    setError(err.error);
    render();
  });
}

function handleWordUpdate(newWord) {
  clearError();
  updateWord(newWord)
  .then((data) => {
    setStoredWord(data.storedWord);
    render();
  })
  .catch((err) => {
    setError(err.error);
    render();
  });
}

export function checkForSession() {
  fetchSession()
  .then((data) => {
    login(data.username);
    return fetchWord();
  })
  .then((data) => {
    setStoredWord(data.storedWord);
    render();
  })
  .catch((err) => {
    if(err.error && err.error !== 'auth-missing') {
      setError(err.error);
    }
    render();
  });
}  