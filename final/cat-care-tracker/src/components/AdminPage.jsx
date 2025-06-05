import React from 'react'

export default function AdminPage({
  adminUsername,
  onAdminLogout,
  users,
  onDeleteUser
}) {
  return (
    <div className="admin-page">
        <div className="navigation">
           <h2>Admin Panel</h2>
            <p>Welcome, {adminUsername}!</p>
            <button onClick={onAdminLogout}>Logout Admin</button> 
        </div>

        <div className="registered-user">
            <h3>Registered Users</h3>
            <ul className="user-list">
                <li className="user-list-header">
                <span className="col-name">Name</span>
                <span className="col-date">Registered Date</span>
                <span className="col-op">Operation</span>
                </li>
                {users.map(u => {
                const d = new Date(u.createdAt)
                const mm = String(d.getMonth() + 1).padStart(2, '0')
                const dd = String(d.getDate()).padStart(2, '0')
                const yyyy = d.getFullYear()
                return (
                    <li key={u.username} className="user-list-item">
                    <span className="col-name">{u.username}</span>
                    <span className="col-date">{`${mm}/${dd}/${yyyy}`}</span>
                    <span className="col-op">
                        <button onClick={() => onDeleteUser(u.username)}>
                        Delete
                        </button>
                    </span>
                    </li>
                )
                })}
            </ul>
        </div>
        
    </div>
  )
}
