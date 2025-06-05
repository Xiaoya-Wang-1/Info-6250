const state = {
    isLoggedIn: false,
    username: '',
    storedWord: '',
    error: '',
};
  
export function getState() {
    return { ...state };
}

export function setError(message) {
    state.error = message;
}

export function clearError() {
    state.error = '';
}

export function login(username) {
    state.isLoggedIn = true;
    state.username = username;
    state.error = '';
}

export function logout() {
    state.isLoggedIn = false;
    state.username = '';
    state.storedWord = '';
    state.error = '';
}

export function setStoredWord(word) {
    state.storedWord = word;
}