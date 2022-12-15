import React, { useEffect, useRef, useState } from 'react'
import { Fireworks } from 'fireworks-js'
import "./EndGame.scss"

/**
  * @param {object} props 
  * @param {number[]} props.playerScores
  */
function EndGame(props) {
  const myref = useRef(null)
  const [fireworks, setFireworks] = useState()
  let winner = ""
  useEffect(() => {
    setFireworks(new Fireworks(myref.current, { /* options */ }))

  }, [myref])
  useEffect(() => {
    if (fireworks) {
      fireworks?.start()
    }
  }, [fireworks])

  if (props.playerScores[0] > props.playerScores[1]) {
    winner = "Player One Won!"
  }
  else if (props.playerScores[0] === props.playerScores[1]) {
    winner = "Its a tie!"
  }
  else{
    winner = "Player Two Won!"
  }
  return (
    <div className='fireworksContainer' ref={myref}>
      <div className='fireworksText'>
        <p className='endGameText'>{winner}</p>
        <button className='retryButton' onClick={() => props.resetClick()}>retry?</button>
      </div>
    </div>
  )
}

export default EndGame