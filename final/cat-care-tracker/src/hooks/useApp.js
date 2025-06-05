import { useReducer, useState, useEffect } from 'react'
import catsReducer from '../reducers/catsReducer'

export default function useApp() {
  const [view, setView]                 = useState('login')
  const [loginType, setLoginType]       = useState('user')
  const [username, setUsername]         = useState('')
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [errorMsg, setErrorMsg]         = useState('')
  const [loggedInUser, setLoggedInUser] = useState('')
  const [cats, dispatch]                = useReducer(catsReducer, [])
  const [catName, setCatName]           = useState('')
  const [catBirthday, setCatBirthday]   = useState('')
  const [catWeight, setCatWeight]       = useState('')
  const [catPhotoBase64, setCatPhotoBase64] = useState('')
  const [catFileKey, setCatFileKey]     = useState(0)
  const [taskInputs, setTaskInputs]     = useState({})
  const [taHeights, setTaHeights]       = useState({})
  const [editingCatId, setEditingCatId] = useState(null)
  const [editName, setEditName]         = useState('')
  const [editBirthday, setEditBirthday] = useState('')
  const [editWeight, setEditWeight]     = useState('')
  const [editPhotoBase64, setEditPhotoBase64] = useState('')
  const [showAddCat, setShowAddCat]     = useState(false)
  const [users, setUsers]               = useState([])

  useEffect(() => {
    if (!loggedInUser) return
    fetch('/api/cats')
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => {
        dispatch({ type: 'SET_CATS', cats: d.cats })
        setShowAddCat(d.cats.length === 0)
      })
      .catch(e => setErrorMsg(e))
  }, [loggedInUser])

  const handleRegister = () => {
    setErrorMsg('')
    fetch('/api/register', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({ username })
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(() => setView('login'))
      .catch(e => setErrorMsg(e))
  }

  const handleLogin = () => {
    setErrorMsg('')
    fetch('/api/session', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({ username })
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => {
        setLoggedInUser(d.username)
        setView('main')
      })
      .catch(e => setErrorMsg(e))
  }

  const handleAdminLogin = () => {
    setErrorMsg('')
    fetch('/api/admin/users', {
      headers:{
        'X-Admin-Username': adminUsername,
        'X-Admin-Password': adminPassword
      }
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => {
        setUsers(d.users)
        setView('admin')
      })
      .catch(e => setErrorMsg(e))
  }

  const handleLogout = () => {
    fetch('/api/session', { method:'DELETE' })
      .finally(() => {
        setLoggedInUser('')
        dispatch({ type:'SET_CATS', cats:[] })
        setView('login')
        setLoginType('user')
      })
  }

  const onDeleteUser = u => {
    setErrorMsg('')
    fetch(`/api/admin/users/${u}`, {
      method:'DELETE',
      headers:{
        'X-Admin-Username': adminUsername,
        'X-Admin-Password': adminPassword
      }
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(() => setUsers(x => x.filter(y => y.username !== u)))
      .catch(e => setErrorMsg(e))
  }

  const handleNewCatFile = f => {
    if (!f) return setCatPhotoBase64('')
    const r = new FileReader()
    r.onload = () => setCatPhotoBase64(r.result)
    r.readAsDataURL(f)
  }

  const handleEditCatFile = f => {
    if (!f) return setEditPhotoBase64('')
    const r = new FileReader()
    r.onload = () => setEditPhotoBase64(r.result)
    r.readAsDataURL(f)
  }

  const addCat = () => {
    setErrorMsg('')
    if (!catName.trim()) return setErrorMsg('Enter cat name')
    if (!catWeight.trim() || isNaN(Number(catWeight)))
      return setErrorMsg('Weight must be number')
    fetch('/api/cats', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({
        name:catName,
        birthday:catBirthday,
        weight:catWeight,
        photoUrl:catPhotoBase64
      })
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => {
        dispatch({ type:'ADD_CAT', cat:d.cat })
        setCatName(''); setCatBirthday(''); setCatWeight('')
        setCatPhotoBase64(''); setCatFileKey(k => k+1)
        setShowAddCat(false)
      })
      .catch(e => setErrorMsg(e))
  }

  const deleteCat = id => {
    setErrorMsg('')
    fetch(`/api/cats/${id}`, { method:'DELETE' })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(() => dispatch({ type:'DELETE_CAT', catId:id }))
      .catch(e => setErrorMsg(e))
  }

  const startEditingCat = cat => {
    setShowAddCat(false)
    setEditingCatId(cat.catId)
    setEditName(cat.name)
    setEditBirthday(cat.birthday||'')
    setEditWeight(String(cat.weight))
    setEditPhotoBase64('')
  }

  const cancelEditingCat = () => {
    setEditingCatId(null)
    setEditName(''); setEditBirthday(''); setEditWeight(''); setEditPhotoBase64('')
  }

  const saveCatEdits = id => {
    setErrorMsg('')
    if (!editName.trim()) return setErrorMsg('Name empty')
    if (editWeight && isNaN(Number(editWeight))) return setErrorMsg('Weight number')
    const body = { name:editName, birthday:editBirthday, weight:editWeight }
    if (editPhotoBase64) body.photoUrl = editPhotoBase64
    fetch(`/api/cats/${id}`, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify(body)
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => {
        dispatch({ type:'UPDATE_CAT', cat:d.cat })
        cancelEditingCat()
      })
      .catch(e => setErrorMsg(e))
  }

  const handleTaskInputChange = (id,v,el) => {
    setTaskInputs(p=>({...p,[id]:v}))
    setTaHeights(p=>({...p,[id]:el.scrollHeight}))
  }

  const addTask = id => {
    setErrorMsg('')
    const title = taskInputs[id]||''
    if (!title.trim()) return setErrorMsg('Task empty')
    fetch(`/api/cats/${id}/tasks`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({ title })
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => {
        dispatch({ type:'ADD_TASK', catId:id, task:d.task })
        setTaskInputs(p=>({...p,[id]:''}))
        setTaHeights(p=>({...p,[id]:0}))
      })
      .catch(e => setErrorMsg(e))
  }

  const toggleTaskDone = (cid,tid,done) => {
    setErrorMsg('')
    fetch(`/api/cats/${cid}/tasks/${tid}`, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json' },
      body:JSON.stringify({ done:!done })
    })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(d => dispatch({ type:'UPDATE_TASK', catId:cid, task:d.task }))
      .catch(e => setErrorMsg(e))
  }

  const deleteTask = (cid,tid) => {
    setErrorMsg('')
    fetch(`/api/cats/${cid}/tasks/${tid}`, { method:'DELETE' })
      .then(r => r.ok ? r.json() : r.json().then(d => Promise.reject(d.error)))
      .then(() => dispatch({ type:'DELETE_TASK', catId:cid, taskId:tid }))
      .catch(e => setErrorMsg(e))
  }

  const toggleAddCat = () => {
    setEditingCatId(null)
    setShowAddCat(p=>!p)
  }

  const loginProps = { loginType, setLoginType, username, setUsername, onUserLogin:handleLogin, adminUsername, setAdminUsername, adminPassword, setAdminPassword, onAdminLogin:handleAdminLogin, errorMsg, setView }
  const registerProps = { username, setUsername, onRegister:handleRegister, setView, errorMsg }
  const adminProps    = { adminUsername, onAdminLogout:()=>{ setView('login'); setLoginType('user'); setUsers([]) }, users, onDeleteUser }
  const mainProps     = { loggedInUser, showAddCat, toggleShowAddCat:toggleAddCat, onLogout:handleLogout, errorMsg, catName, setCatName, catBirthday, setCatBirthday, catWeight, setCatWeight, catPhotoBase64, catFileKey, onNewCatFile:handleNewCatFile, addCat, cats, deleteCat, editingCatId, editName, setEditName, editBirthday, setEditBirthday, editWeight, setEditWeight, editPhotoBase64, onEditCatFile:handleEditCatFile, onStartEdit:startEditingCat, onCancelEdit:cancelEditingCat, onSaveEdit:saveCatEdits, taskInputs, taHeights, onTaskInputChange:handleTaskInputChange, onAddTask:addTask, onToggleTask:toggleTaskDone, onDeleteTask:deleteTask }

  return { view, loginProps, registerProps, adminProps, mainProps }
}