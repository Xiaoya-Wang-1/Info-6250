import React from 'react'

export default function LoginPage({
  loginType,
  setLoginType,
  username,
  setUsername,
  onUserLogin,
  adminUsername,
  setAdminUsername,
  adminPassword,
  setAdminPassword,
  onAdminLogin,
  errorMsg,
  setView
}) {
  return (
    <div className="login-page">
      <h2>Cat Care Tracker</h2>
      <div>
        <label>
          <input
            type="radio"
            value="user"
            checked={loginType === 'user'}
            onChange={() => setLoginType('user')}
          /> User
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            checked={loginType === 'admin'}
            onChange={() => setLoginType('admin')}
          /> Admin
        </label>
      </div>
      {loginType === 'user' ? (
        <>
          <div>
            <label>Username:</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <button onClick={onUserLogin}>Log In</button>
          <p>
            Don't have an account?{' '}
            <span className="link" onClick={() => setView('register')}>
              Register
            </span>
          </p>
        </>
      ) : (
        <>
          <div>
            <label>Admin Name:</label>
            <input
              value={adminUsername}
              onChange={e => setAdminUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div>
            <label>Admin Password:</label>
            <input
              type="password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
            />
          </div>
          <button onClick={onAdminLogin}>Login as Admin</button>
        </>
      )}
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
  )
}
