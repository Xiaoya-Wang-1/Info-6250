import { useState } from 'react'
import Login from './Login.jsx'
import Game from './Game.jsx'
import './App.css' 

function App() {
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div className="app">
      {currentUser === '' && (
        <Login onLoginSuccess={setCurrentUser} />
      )}
      {currentUser !== '' && (
        <Game currentUser={currentUser} onLogout={() => setCurrentUser('')} />
      )}
    </div>
  )
}

export default App