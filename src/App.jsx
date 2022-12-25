import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Die from './Die'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(getNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)

    if (allHeld && sameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function getNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice())
    }

    return newDice
  }

  function holdDice(diceId) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === diceId ? 
        {...die, isHeld: !die.isHeld} : die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? 
          die : 
          generateDice()
      }))
    } else {
      setTenzies(false)
      setDice(getNewDice())
    }
  }

  const diceElement = dice.map(die => {
    return <Die 
      number={die.value} 
      key={die.id} 
      isHeld={die.isHeld} 
      toggle={() => holdDice(die.id)} 
      />
  })
  
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='subtitle'>Roll until all dice are the same. <span>Click each die to freeze it at its current value between rolls.</span></p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button 
        className='roll-btn' 
        onClick={rollDice}
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}

export default App
