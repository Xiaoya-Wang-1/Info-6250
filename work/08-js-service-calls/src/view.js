import { getState } from './model.js';

export function render() {
  const app = document.getElementById('app');
  const state = getState();

  if(!state.isLoggedIn) {
    app.innerHTML = getLoginPage(state);
    return;
  }

  app.innerHTML = getWordPage(state);
}

function getLoginPage(state) {
  const errorMessage = state.error 
    ? `<div class="error">${makeError(state.error)}</div>`
    : '';

  return `
    <header>
      <h1>Login to Word App</h1>
    </header>
    <main>
      <form id="login-form">
        <div>
          <label for="username">Enter username:</label>
          <input id="username" name="username" />
        </div>
        <button type="submit">Login</button>
      </form>
      ${errorMessage}
    </main>
  `;
}

function getWordPage(state) {
  const errorMessage = state.error
    ? `<div class="error">${makeError(state.error)}</div>`
    : '';

  return `
    <header class="top-bar">
      <div>Welcome, <strong>${state.username}</strong></div>
      <h1>Word App</h1>
      <button id="logout">Logout</button>
    </header>

    <main>
      ${errorMessage}
      <div class="word-view">
        <h2>Your Stored Word</h2>
        <div class="displayed-word">
          Current word: <strong>${state.storedWord}</strong>

          <form id="word-form">
            <div>
              <label for="word-input">Update word:</label>
              <input 
                id="word-input" 
                name="word" 
                value="${state.storedWord}" 
              />
            </div>
            <button class="submit-button" type="submit">Update</button>
          </form>
        </div>
      </div>
    </main>
  `;
}

function makeError(error) {
  switch(error) {
    case 'auth-insufficient':
      return 'Incorrect password (Dog not allowed!)';
    case 'required-username':
      return 'Please enter a valid username (alphanumeric only)';
    case 'network-error':
      return 'Network error, please try again';
    case 'auth-missing':
      return 'You must be logged in';
    default:
      return error;
  }
}