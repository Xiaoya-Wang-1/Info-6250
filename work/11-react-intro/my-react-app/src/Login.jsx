import { useState } from 'react'
import './Login.css'

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const lettersOnly = /^[A-Za-z]+$/
    if (!lettersOnly.test(username)) {
      setErrorMessage('Username is not made up of valid characters.')
      return
    }

    if (username.toLowerCase() === 'dog') {
      setErrorMessage('dog is not a valid user.')
      return
    }

    const allowList = ['cat', 'manager', 'bob'];

    if (allowList.includes(username.toLowerCase())) {
      setErrorMessage('');
      onLoginSuccess(username);
      return;
    }


    setErrorMessage(`User "${username}" not recognized.`)
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="login-username">Enter Username:</label>
        <input
        id="login-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
    </div>
  )
}