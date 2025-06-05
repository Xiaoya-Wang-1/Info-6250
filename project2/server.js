const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const sessions = {}; 

const users = {}; 

let nextSessionId = 1; 
let nextMessageId = 100;

const messages = [];

const channels = [ 'general', 'random', 'help' ];

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./public'));

function generateSessionId() {
  const sid = 'sid' + nextSessionId + '-' + Math.floor(Math.random()*1000000);
  nextSessionId += 1;
  return sid;
}

function sanitizeUsername(username) {
  return /^[A-Za-z0-9_]+$/.test(username);
}

function getUniqueLoggedInUsers() {
  return Object.keys(users).filter((username) => {
    return users[username].sessionCount > 0;
  });
}

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  return res.json({ username: sessions[sid].username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username required' });
  }
  if (username === 'dog') {
    return res.status(403).json({ error: 'Username "dog" is not allowed' });
  }
  if (!sanitizeUsername(username)) {
    return res.status(400).json({ error: 'Invalid username (must be letters/numbers/underscore)' });
  }

  const sid = generateSessionId();
  sessions[sid] = { username };

  if (!users[username]) {
    users[username] = { sessionCount: 0 };
  }
  users[username].sessionCount += 1;

  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'strict'
  });

  return res.json({ username });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { username } = sessions[sid];

  delete sessions[sid];

  if (users[username]) {
    users[username].sessionCount -= 1;
    if (users[username].sessionCount < 0) {
      users[username].sessionCount = 0; 
    }
  }

  res.clearCookie('sid');
  return res.json({ message: 'Logged out' });
});

app.get('/api/v1/users', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  const loggedInUsers = getUniqueLoggedInUsers();
  res.json({ users: loggedInUsers });
});

app.get('/api/v1/channels', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  return res.json({ channels });
});


app.get('/api/v1/messages', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const { channel, sinceId } = req.query;
  const safeChannel = channel && channels.includes(channel) ? channel : 'general';

  let filtered = messages.filter((m) => m.channel === safeChannel);

  if (sinceId) {
    const sinceIdNum = Number(sinceId);
    filtered = filtered.filter((m) => m.id > sinceIdNum);
  }

  res.json({ messages: filtered });
});

app.post('/api/v1/messages', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions[sid]) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const { username } = sessions[sid];
  const { text, channel } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Message text cannot be empty' });
  }

  const safeChannel = channel && channels.includes(channel) ? channel : 'general';

  const newMsg = {
    id: nextMessageId++,
    text,
    author: username,
    channel: safeChannel,
    timestamp: Date.now(),
  };
  messages.push(newMsg);

  return res.json({ message: 'Message posted', messageObj: newMsg });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});