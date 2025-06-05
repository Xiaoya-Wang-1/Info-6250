let catIdCounter = 1
let taskIdCounter = 1

const userData = {}

export function hasUser(username) {
  return Boolean(userData[username])
}

export function registerUser(username) {
  userData[username] = {
    cats: [],
    createdAt: new Date().toISOString()
  }
}

export function getCats(username) {
  return userData[username].cats
}

export function createCat(username, { name, birthday, weight, photoUrl }) {
  const cat = { catId: catIdCounter++, name, birthday, weight, photoUrl, tasks: [] }
  userData[username].cats.push(cat)
  return cat
}

export function updateCat(username, catId, { name, birthday, weight, photoUrl }) {
  const cats = userData[username].cats
  const cat = cats.find(c => c.catId === catId)
  if (!cat) return null
  if (name     !== undefined) cat.name     = name
  if (birthday !== undefined) cat.birthday = birthday
  if (weight   !== undefined) cat.weight   = weight
  if (photoUrl !== undefined) cat.photoUrl = photoUrl
  return cat
}

export function deleteCat(username, catId) {
  const cats = userData[username].cats
  const idx = cats.findIndex(c => c.catId === catId)
  if (idx === -1) return false
  cats.splice(idx, 1)
  return true
}

export function createTask(username, catId, title) {
  const cat = userData[username].cats.find(c => c.catId === catId)
  if (!cat) return null
  const task = { taskId: taskIdCounter++, title, done: false }
  cat.tasks.push(task)
  return task
}

export function updateTask(username, catId, taskId, done) {
  const cat = userData[username].cats.find(c => c.catId === catId)
  if (!cat) return null
  const task = cat.tasks.find(t => t.taskId === taskId)
  if (!task) return null
  task.done = done
  return task
}

export function deleteTask(username, catId, taskId) {
  const cat = userData[username].cats.find(c => c.catId === catId)
  if (!cat) return false
  const idx = cat.tasks.findIndex(t => t.taskId === taskId)
  if (idx === -1) return false
  cat.tasks.splice(idx, 1)
  return true
}

export function getUsers() {
  return Object.entries(userData).map(([username, info]) => ({
    username,
    createdAt: info.createdAt
  }))
}

export function deleteUser(username) {
  if (!userData[username]) return false
  delete userData[username]
  return true
}
