'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const controller = require('./src/game-controller');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', controller.handleHome);
app.post('/login', controller.handleLogin);
app.post('/logout', controller.handleLogout);
app.post('/guess', controller.handleGuess);
app.post('/new-game', controller.handleNewGame);
app.get('/leaderboard', controller.handleLeaderboard);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
