import React, { useEffect, useRef, useState } from 'react'
import { Fireworks } from 'fireworks-js'
import "./EndGame.css"

function EndGame(props) {
  const myref = useRef(null)
  const [fireworks, setFireworks] = useState()
  useEffect(() => {
    setFireworks(new Fireworks(myref.current, { /* options */ }))

  }, [myref])
  useEffect(() => {
    if (fireworks) {
      console.log(fireworks);
      fireworks?.start()
    }
  }, [fireworks])

  return (
    <div className='fireworksContainer' ref={myref}>
      <div className='fireworksText'>
        <p className='endGameText'>End Game</p>
        <button className='retryButton' onClick={()=> props.resetClick()}>retry?</button>
      </div>
    </div>
  )
}

export default EndGame