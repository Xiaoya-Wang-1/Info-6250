import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';
import { validateString, validateNumber } from './src/utils.js'

import {
  hasUser,
  registerUser,
  getCats,
  createCat,
  updateCat,
  deleteCat,
  createTask,
  updateTask,
  deleteTask,
  getUsers,
  deleteUser
} from './src/model.js'

const ADMIN_CREDENTIALS = {
  admin: '123456',
  boss:  'pa5word'
}

const sessions = {}

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now()
}

function validateSession(req) {
  const sid = req.cookies.sid
  if (!sid || !sessions[sid]) return null
  const u = sessions[sid]
  return u.trim().toLowerCase() === 'dog' ? null : u
}

function validateAdmin(req) {
  const uRaw = req.headers['x-admin-username'] || ''
  const p    = req.headers['x-admin-password'] || ''
  const u    = uRaw.toLowerCase().trim()
  return ADMIN_CREDENTIALS[u] === p
}

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'dist')))

app.post('/api/register', (req, res) => {
  try {
    validateString('username', req.body.username)
    const u = req.body.username
    if (u.trim().toLowerCase() === 'dog') {
      return res.status(403).json({ error: 'User "dog" is banned' })
    }
    if (hasUser(u)) {
      return res.status(409).json({ error: 'Username already exists' })
    }
    registerUser(u)
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.post('/api/session', (req, res) => {
  try {
    validateString('username', req.body.username)
    const u = req.body.username
    if (!hasUser(u) || u.trim().toLowerCase() === 'dog') {
      return res.status(403).json({ error: 'User not found or banned' })
    }
    const sid = generateSessionId()
    sessions[sid] = u
    res.cookie('sid', sid, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: 'strict'
    })
    res.json({ success: true, username: u })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid
  if (sid && sessions[sid]) delete sessions[sid]
  res.clearCookie('sid')
  res.json({ success: true })
})

app.get('/api/cats', (req, res) => {
  const u = validateSession(req)
  if (!u) return res.status(403).json({ error: 'Not logged in or banned' })
  res.json({ cats: getCats(u) })
})

app.post('/api/cats', (req, res) => {
  try {
    const u = validateSession(req)
    if (!u) throw new Error('Not logged in or banned')
    validateString('name', req.body.name)
    validateNumber('weight', req.body.weight)
    const cat = createCat(u, {
      name: req.body.name,
      birthday: req.body.birthday || '',
      weight: Number(req.body.weight),
      photoUrl: req.body.photoUrl || '/default.png'
    })
    res.json({ success: true, cat })
  } catch (e) {
    res.status(e.message === 'Not logged in or banned' ? 403 : 400)
       .json({ error: e.message })
  }
})

app.put('/api/cats/:catId', (req, res) => {
  try {
    const u = validateSession(req)
    if (!u) throw new Error('Not logged in or banned')
    const id = Number(req.params.catId)
    if (req.body.name   !== undefined) validateString('name', req.body.name)
    if (req.body.weight !== undefined) validateNumber('weight', req.body.weight)
    const cat = updateCat(u, id, {
      name: req.body.name   !== undefined ? req.body.name : undefined,
      birthday: req.body.birthday !== undefined ? req.body.birthday : undefined,
      weight: req.body.weight !== undefined ? Number(req.body.weight) : undefined,
      photoUrl: req.body.photoUrl !== undefined ? req.body.photoUrl : undefined
    })
    if (!cat) return res.status(404).json({ error: 'Cat not found' })
    res.json({ success: true, cat })
  } catch (e) {
    res.status(e.message === 'Not logged in or banned' ? 403 : 400)
       .json({ error: e.message })
  }
})

app.delete('/api/cats/:catId', (req, res) => {
  const u = validateSession(req)
  if (!u) return res.status(403).json({ error: 'Not logged in or banned' })
  const ok = deleteCat(u, Number(req.params.catId))
  if (!ok) return res.status(404).json({ error: 'Cat not found' })
  res.json({ success: true })
})

app.post('/api/cats/:catId/tasks', (req, res) => {
  try {
    const u = validateSession(req)
    if (!u) throw new Error('Not logged in or banned')
    validateString('title', req.body.title)
    const task = createTask(u, Number(req.params.catId), req.body.title)
    if (!task) return res.status(404).json({ error: 'Cat not found' })
    res.json({ success: true, task })
  } catch (e) {
    res.status(e.message === 'Not logged in or banned' ? 403 : 400)
       .json({ error: e.message })
  }
})

app.put('/api/cats/:catId/tasks/:taskId', (req, res) => {
  const u = validateSession(req)
  if (!u) return res.status(403).json({ error: 'Not logged in or banned' })
  const task = updateTask(
    u,
    Number(req.params.catId),
    Number(req.params.taskId),
    Boolean(req.body.done)
  )
  if (!task) return res.status(404).json({ error: 'Cat or task not found' })
  res.json({ success: true, task })
})

app.delete('/api/cats/:catId/tasks/:taskId', (req, res) => {
  const u = validateSession(req)
  if (!u) return res.status(403).json({ error: 'Not logged in or banned' })
  const ok = deleteTask(u, Number(req.params.catId), Number(req.params.taskId))
  if (!ok) return res.status(404).json({ error: 'Cat or task not found' })
  res.json({ success: true })
})

app.get('/api/admin/users', (req, res) => {
  if (!validateAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  res.json({ users: getUsers() })
})

app.delete('/api/admin/users/:username', (req, res) => {
  if (!validateAdmin(req)) return res.status(403).json({ error: 'Forbidden' })
  const ok = deleteUser(req.params.username)
  if (!ok) return res.status(404).json({ error: 'User not found' })
  res.json({ success: true })
})

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})