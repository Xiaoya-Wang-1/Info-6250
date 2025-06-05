'use strict';

const crypto = require('crypto');
const words = require('../words');

const sessions = {};

const userInfos = {};

const leaderboard = [];

function pickRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function getLetterMatchCount(guess, secret) {
  const guessChars = guess.toUpperCase().split('');
  const secretChars = secret.toUpperCase().split('');
  let matchCount = 0;

  for (const ch of guessChars) {
    const idx = secretChars.indexOf(ch);
    if (idx >= 0) {
      matchCount++;
      secretChars.splice(idx, 1);
    }
  }
  return matchCount;
}

function startNewGame(username) {
  const secretWord = pickRandomWord().toUpperCase();

  console.log(`Starting new game for "${username}" with secret word: ${secretWord}`);

  if (!userInfos[username]) {
    userInfos[username] = {};
  }
  userInfos[username].secretWord = secretWord;
  userInfos[username].hasWon = false;
  userInfos[username].guesses = userInfos[username].guesses || [];
  userInfos[username].guesses.length = 0;
}

function isValidUsername(username) {
  if (!username || username === 'dog') {
    return false;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return false;
  }
  return true;
}

function updateLeaderboard(username) {
  const { personalBest } = userInfos[username];

  if (typeof personalBest !== 'number') {
    return;
  }

  const existing = leaderboard.find(entry => entry.username === username);
  if (existing) {
    existing.bestScore = personalBest;
  } else {
    leaderboard.push({ username, bestScore: personalBest });
  }

  leaderboard.sort((a, b) => a.bestScore - b.bestScore);
}

function getTopLeaderboard(n = 5) {
  return leaderboard.slice(0, n);
}

module.exports = {
  sessions,
  userInfos,
  startNewGame,
  isValidUsername,
  getLetterMatchCount,
  updateLeaderboard,
  getTopLeaderboard
};