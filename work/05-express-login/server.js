const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const {
  addSession,
  getSession,
  deleteSession,
  getStoredWord,
  setStoredWord,
  validateUsername,
} = require('./model');

const {
  renderLoginPage,
  renderDataPage,
  renderErrorPage,
} = require('./views');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const session = getSession(sid);

  if (!session) {
    res.send(renderLoginPage());
    return;
  }

  const username = session.username;
  const storedWord = getStoredWord(username);
  res.send(renderDataPage(username, storedWord));
});

/* login */
app.post('/login', (req, res) => {
  const { username } = req.body;
  const { valid, reason, msg } = validateUsername(username);

  if (!valid) {
    res.status(reason).send(renderErrorPage(reason, msg));
    return;
  }

  const sid = addSession(username);
  res.cookie('sid', sid);
  res.redirect('/');
});

/* update word */
app.post('/update-word', (req, res) => {
  const sid = req.cookies.sid;
  const session = getSession(sid);

  if (!session) {
    res.status(400).send(renderErrorPage(400, 'No valid session. Please login.'));
    return;
  }

  const username = session.username;
  const newWord = req.body.newWord || "";
  setStoredWord(username, newWord);

  res.redirect('/');
});

/* logout */
app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    deleteSession(sid);
  }

  res.clearCookie('sid');
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});