import { useState } from 'react'
import compareWords from './compareWords.js'
import './Game.css'

export default function Game({ currentUser, onLogout }) {
  const [guess, setGuess] = useState('')
  const [messages, setMessages] = useState([])

  const secret = 'RECAT'

  function handleSubmit(e) {
    e.preventDefault()
    const guessTrimmed = guess.trim()

    setGuess('')

    if (guessTrimmed.length !== 5) {
      setMessages((prev) => [
        ...prev,
        `${guessTrimmed} was not a valid word`
      ])
      return
    }

    if (guessTrimmed.toUpperCase() === secret) {
      setMessages((prev) => [
        ...prev,
        `${guessTrimmed} is the secret word!`
      ])
      return
    }

    const numInCommon = compareWords(guessTrimmed, secret)
    setMessages((prev) => [
      ...prev,
      `${guessTrimmed} had ${numInCommon} letters in common`
    ])
  }

  return (
    <div className="gamepage">
        <div className="logoutbar">
            <button className="logout" onClick={onLogout}>Logout</button>
            <h1>Hi, {currentUser}! </h1>
        </div>
        <div className="game">
          <div className="welcome">
              <h2>Guess the secret word🐱!</h2>
          </div>

          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="guess-input">Enter 5-letter word:</label>
                  <input
                      id="guess-input"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)} />
              </div>
              <button type="submit">Submit Guess</button>
          </form>


          <div className="results">
              {messages.map((msg, i) => (
                  <p key={i}>{msg}</p>
              ))}
          </div>
        </div>
      </div>
  )
}