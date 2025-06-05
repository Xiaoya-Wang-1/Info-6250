export default function compareWords(guess, secret) {
    const guessUpper = guess.toUpperCase()
    const secretUpper = secret.toUpperCase()
  
    const secretLetters = secretUpper.split('')
    let count = 0
  
    for (const letter of guessUpper) {
      const index = secretLetters.indexOf(letter)
      if (index !== -1) {
        count++
        secretLetters.splice(index, 1)
      }
    }
  
    return count
}  