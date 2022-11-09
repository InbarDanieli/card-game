import React, { useEffect, useState } from "react";
import "./Game.scss";
import Card from "../card/Card";
import { cardsInformation } from "../../services/CardsInformation";
import { getCatsImages } from "../../services/CatAPI";
import EndGame from "../EndGame/EndGame";


function Game() {
  const [twoCards, setTwoCards] = useState(false)
  const [info, setInfo] = useState({})
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState([])
  const [catArr, setCatArr] = useState([])
  const [player, setPlayer] = useState(0)
  const [playerScores, setPlayerScores] = useState([0, 0])
  const [endPage, setEndPage] = useState(false)
  const [cardAmount, setCardAmount] = useState(8)
  const [isLoading, setLoading] = useState(false)
  const [isreset, setReset] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCatsImages()
      .then((res) => {
        setCatArr(res);
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (catArr.length !== 0) {
      setCards(cardsInformation(cardAmount / 2, catArr))
    }
    setInfo({})
    setScore(0)
    setTwoCards(false)
    setPlayerScores([0, 0])
    setPlayer(0)
    setEndPage(false)
  }, [cardAmount, catArr, isreset])


  function flipCard(Key) {
    const cardIndex = cards.findIndex((value) => value.Key === Key)
    cards[cardIndex].flip = !cards[cardIndex].flip
    setCards([...cards])
  }

  function printInfo(name, Key, flip) {
    // click on fliped card
    if (flip) {
      return
    }

    // one card has choosen 
    if (!twoCards) {
      setInfo({ name, Key })
      setTwoCards(true)
      flipCard(Key)
      return
    }

    //two cards has choosen
    flipCard(Key)
    setInfo({})
    setTwoCards(false)

    // not match
    if (info.name !== name) {
      setTimeout(() => {
        flipCard(info.Key)
        flipCard(Key)
      }, 1000);
      setPlayer(player === 0 ? 1 : 0)
      return
    }
    // match
    setScore(score + 1)
    playerScores[player]++
    setPlayerScores([...playerScores])

    // end of the game
    cards.reduce((prev, curr) => prev + !curr.flip, 0) === 0 && setTimeout(() => {
      setEndPage(true)
    }, 800);
  }

  return (
    <>
      {endPage &&
        <EndGame
          playerScores={playerScores}
          resetClick={() => setReset(!isreset)}
        />}
      <div style={{ opacity: endPage && 0.4 }} className="fullPageContainer">
        <div className="navbar" style={{ display: `${isLoading ? "none" : ""}` }}>
          <div className={`${player === 0 ? "player choosen" : "player"}`}>P1 - {playerScores[0]}</div>
          <div className="buttonsContainer">
            <button card-amount="8" className={`cardsAmountButton ${cardAmount === 8 && "choosen"}`} onClick={() => { setReset(!isreset); setCardAmount(8) }}>8</button>
            <button card-amount="16" className={`cardsAmountButton ${cardAmount === 16 && "choosen"}`} onClick={() => { setReset(!isreset); setCardAmount(16) }}>16</button>
            <button card-amount="32" className={`cardsAmountButton ${cardAmount === 32 && "choosen"}`} onClick={() => { setReset(!isreset); setCardAmount(32) }}>32</button>
          </div>
          <div className={`${player === 1 ? "player choosen" : "player"}`}>P2 - {playerScores[1]}</div>
        </div>
        {isLoading && <div className="loading"><p>loading...</p></div>}
        <div className="cards" style={{ "--colums": cards.length === 32 && 8, "--smaller-screen-colums": cards.length === 8 && 2 }}>
          {cards.map((info) =>
            <Card
              key={info.Key}
              Key={info.Key}
              name={info.name}
              imageID={info.imageID}
              flip={info.flip}
              Onclick={(name, Key, flip) => printInfo(name, Key, flip)}
            />)}
        </div>
      </div>
    </>
  )
}

export default Game;
