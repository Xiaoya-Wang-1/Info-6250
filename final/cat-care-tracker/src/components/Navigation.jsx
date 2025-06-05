import React from 'react'

export default function Navigation({ loggedInUser, showAddCat, toggleShowAddCat, onLogout }) {
  return (
    <div className="navigation">
      <h1>Welcome, {loggedInUser}!</h1>
      <div className="navigation-button">
        <button onClick={toggleShowAddCat}>{showAddCat ? 'Hide Add Cat' : 'Add Cat'}</button>
        <button onClick={onLogout}>Log Out</button>
      </div>
    </div>
  )
}