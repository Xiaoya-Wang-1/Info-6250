'use strict';

function getLoginPage(message) {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Word Guess Login</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <header>
          <h1>Word Guess Game</h1>
        </header>
        <main>
          <section class="login-section">
            <h2>Login</h2>
            <p>*User name must using letters*</p>
            <form action="/login" method="POST">
              <label for="username">Username:</label>
              <input name="username" required />
              <button type="submit">Login</button>
            </form>
            ${
              message
                ? `<p class="error">${message}</p>`
                : ''
            }
          </section>
        </main>
      </body>
    </html>
  `;
  }
  
  function getHomePage(username, userData, possibleWords, invalidGuessMessage) {
    if (!userData) {
      return `<p>Unexpected error: no user data.</p>`;
    }
  
    const { hasWon, guesses, secretWord } = userData;
  
    const guessList = guesses.map((g, index) => {
      if (!g.wasValid) {
        return `<li class="invalid">Guess ${index + 1}: Invalid guess: <strong>${g.guess}</strong></li>`;
      }
      const correctness = g.wasCorrect
        ? `<span class="correct">(Correct!)</span>`
        : `(${g.matchCount} matching letters)`;
      return `<li>Guess ${index + 1}: ${g.guess.toUpperCase()} ${correctness}</li>`;
    }).join('');
  
    
    const wordList = possibleWords
      .map((w) => `<li>${w}</li>`)
      .join('');
  
    const totalValid = guesses.filter((g) => g.wasValid).length;
  
    let guessForm = '';
    if (hasWon) {
      guessForm = `
        <div class="guess-div">
          <p class="success">You have won! The secret word was "<strong>${secretWord}</strong>".</p>
          <form action="/new-game" method="POST">
            <button type="submit">Start New Game</button>
          </form>
        </div>
      `;
    } else {
      guessForm = `
        <form action="/guess" method="POST">
          <label for="guess">Enter Guess:</label>
          <input name="guess" required />
          <button type="submit">Guess</button>
        </form>
        <form action="/new-game" method="POST">
          <button type="submit">Start New Game</button>
        </form>
      `;
    }
  
    const invalidGuessMsgBlock = invalidGuessMessage
      ? `<p class="error">"${invalidGuessMessage}" is invalid.</p>`
      : ''; 
  
    return `
      <!DOCTYPE html>
      <html lang="en">
          <head>
          <meta charset="utf-8" />
          <title>Word Guess Home</title>
          <link rel="stylesheet" href="/style.css">
          </head>
          <body>
          <header>
              <h1>Welcome, ${username}!</h1>
              <nav class="navigation-section">
              <form action="/logout" method="POST">
                  <button type="submit">Logout</button>
              </form>
              <form action="/leaderboard" method="GET">
                  <button type="submit">Leaderboard</button>
              </form>
              </nav>
          </header>
          <main>
              <section class="info-section">
              <h2>Possible Words</h2>
              <!-- It's often good to limit height with CSS and scroll for a big list -->
              <ul class="possible-words">
                  ${wordList}
              </ul>
              </section>
              <section class="game-section">
              <h2>Your Guesses</h2>
              <div class="guess-div">
                <p>You have made ${totalValid} valid guess(es) so far.</p>
                <ul class="guess-list">
                    ${guessList}
                </ul>
              </div>
              ${guessForm}
              </section>
          </main>
          </body>
      </html>
  `;
  }
  
  
  function getLeaderboardPage(leaderboard) {
    const rows = leaderboard
      .map((entry, index) => {
        return `
          <li>
            <div>${index + 1} </div>
            <div>${entry.username}</div> 
            <div>${entry.bestScore}</div>
          </li>
        `;
      })
      .join('');
  
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Word Guess Leaderboard</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <header>
            <h1>Leaderboard</h1>
            <nav class="navigation-section">
              <form action="/" method="GET">
                  <button type="submit">Return Home</button>
              </form>
            </nav>
          </header>
          <main>
            <section class="rank-container">
              <h2>The master comes with the least tries!</h2>
              <ul class="board-rank">
                <li>
                  <div>Rank</div>
                  <div>Player</div> 
                  <div>Best Score</div>
                </li>
                ${rows}
              </ul>
          </section>
          </main>
        </body>
      </html>
  `;
  }
  
  module.exports = {
    getLoginPage,
    getHomePage,
    getLeaderboardPage,
  };  