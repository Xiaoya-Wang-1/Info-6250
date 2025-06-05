const crypto = require('crypto');

const sessions = {};
const userWords = {};

function addSession(username) {
  const sid = crypto.randomUUID();
  sessions[sid] = { username };
  return sid;
}

function getSession(sid) {
  return sessions[sid];
}

function deleteSession(sid) {
  delete sessions[sid];
}

function validateUsername(username) {
  const trimmed = username.trim();

  if (trimmed === 'dog') {
    return { valid: false, reason: 403, msg: 'Dog is not allowed.' };
  }

  if (!trimmed) {
    return { valid: false, reason: 400, msg: 'Empty username.' };
  }

  const alphaNum = /^[a-z A-Z 0-9]+$/;
  if (!alphaNum.test(trimmed)) {
    return { valid: false, reason: 400, msg: 'Invalid username, your name is not alphanumeric.' };
  }

  return { valid: true, reason: 200, msg: 'Username is valid.' };
}

function getStoredWord(username) {
  if (!userWords[username]) {
    userWords[username] = "";
  }
  return userWords[username];
}

function setStoredWord(username, newWord) {
  userWords[username] = newWord;
}

module.exports = {
  addSession,
  getSession,
  deleteSession,
  getStoredWord,
  setStoredWord,
  validateUsername,
};