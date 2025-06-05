import React from 'react'

export default function RegisterPage({
  username,
  setUsername,
  onRegister,
  setView,
  errorMsg
}) {
  return (
    <div className="register-page">
      <h2>Register New User</h2>
      <div>
        <label>Username:</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <button onClick={onRegister}>Register</button>
      <p>
        Already have an account?{' '}
        <span className="link" onClick={() => setView('login')}>
          Login
        </span>
      </p>
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
  )
}