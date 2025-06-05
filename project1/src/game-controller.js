'use strict';

const {
    sessions,
    userInfos,
    startNewGame,
    isValidUsername,
    getLetterMatchCount,
    updateLeaderboard,
    getTopLeaderboard
  } = require('./game-model');
  
  const {
    getLoginPage,
    getHomePage,
    getLeaderboardPage
  } = require('./game-view');
  
  const controller = {};
  
  
  function getUsernameFromSession(sid) {
    return sessions[sid];
  }
  
  
  controller.handleHome = (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameFromSession(sid);
  
    if (!username) {
      const html = getLoginPage('');
      res.send(html);
      return;
    }

    const userData = userInfos[username];

    const words = require('../words');
    
    let invalidGuessMessage = '';
    if(userData && userData.guesses.length > 0) {
      const lastGuess = userData.guesses[userData.guesses.length - 1];
      if (!lastGuess.wasValid) {
        invalidGuessMessage = lastGuess.guess;
      }
    }
  
    const html = getHomePage(username, userData, words, invalidGuessMessage);
    res.send(html);
  };
  
  
  controller.handleLogin = (req, res) => {
    const { username } = req.body;
    
    if (username === 'dog') {
      const html = getLoginPage(`Username "${username}" is not granted access.`);
      res.send(html);
      return;
    }
  
    if (!isValidUsername(username)) {
      const html = getLoginPage(`"${username}" is not a valid username.`);
      res.send(html);
      return;
    }

    if (!userInfos[username] || !userInfos[username].secretWord) {
      startNewGame(username);
    }

    const sid = crypto.randomUUID();
  
    sessions[sid] = username;
  
    res.cookie('sid', sid, {
      sameSite: 'strict',
      httpOnly: true
    });
  
    res.redirect('/');
  };
  

  controller.handleLogout = (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
      delete sessions[sid];
    }

    res.clearCookie('sid');
    res.redirect('/');
  };
  

  controller.handleGuess = (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameFromSession(sid);
  
    if (!username) {
      const html = getLoginPage('You must be logged in to guess.');
      res.send(html);
      return;
    }
  
    const userData = userInfos[username];
    if (!userData) {
      const html = getLoginPage('No user data found.');
      res.send(html);
      return;
    }
  
    if (userData.hasWon) {
      res.redirect('/');
      return;
    }
  
    const guess = (req.body.guess || '').trim().toUpperCase();
    
    const words = require('../words');
    const isInWordsList = words.map((w) => w.toUpperCase()).includes(guess);
  
    const alreadyGuessed = userData.guesses.some(
      (g) => g.guess.toUpperCase() === guess && g.wasValid
    );
  
    if (!isInWordsList || alreadyGuessed) {
      userData.guesses.push({
        guess,
        wasValid: false
      });
      res.redirect('/');
      return;
    }
  
    const matchCount = getLetterMatchCount(guess, userData.secretWord);
    const wasCorrect = guess === userData.secretWord;
  
    userData.guesses.push({
      guess,
      matchCount,
      wasValid: true,
      wasCorrect
    });
  
    if (wasCorrect) {
      userData.hasWon = true;
      userData.totalGamesCompleted = (userData.totalGamesCompleted || 0) + 1;
      const totalValidGuesses = userData.guesses.filter(g => g.wasValid).length;
      if (typeof userData.personalBest === 'number') {
        if (totalValidGuesses < userData.personalBest) {
          userData.personalBest = totalValidGuesses;
        }
      } else {
        userData.personalBest = totalValidGuesses;
      }
      updateLeaderboard(username);
    }
  
    res.redirect('/');
  };
  
  controller.handleNewGame = (req, res) => {
    const sid = req.cookies.sid;
    const username = getUsernameFromSession(sid);
  
    if (!username) {
      const html = getLoginPage('You must be logged in to start a new game.');
      res.send(html);
      return;
    }
    startNewGame(username);
    res.redirect('/');
  };
  
  controller.handleLeaderboard = (req, res) => {
    const top = getTopLeaderboard();
    const html = getLeaderboardPage(top);
    res.send(html);
  };
  
  module.exports = controller;  