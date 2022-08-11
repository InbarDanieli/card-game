import React, { useEffect, useState } from "react";
import "./Game.scss";
import Card from "../card/Card";
import { cardsInformation } from "../../services/CardsInformation";
import EndGame from "../EndGame/EndGame";


function Game(props) {
  const [twoCards, setTwoCards] = useState(false)
  const [info, setInfo] = useState({})
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState([])
  const [catArr, setCatArr] = useState([])
  const [player, setPlayer] = useState(0)
  const [playerScores, setPlayerScores] = useState([0, 0])
  const [endPage, setEndPage] = useState(false)
  const [cardAmount, setCardAmount] = useState(8)


  useEffect(() => {
    fetch("https://cataas.com/api/cats?tags=cute")
      .then((res) => res.json())
      .then((res) => res.filter((cat) => !(cat.tags.includes("gif"))))
      .then((res) => { setCatArr(res); setCards(cardsInformation(cardAmount/2, res)) })
  }, [cardAmount])

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

  function resetGame(cardsNumber) {
    setInfo({})
    setScore(0)
    setTwoCards(false)
    setCards(cardsInformation(cardsNumber / 2, catArr))
    setPlayerScores([0, 0])
    setPlayer(0)
    setEndPage(false)
  }

  return (
    <>
      {endPage &&
        <EndGame
          playerScores={playerScores}
          resetClick={() => resetGame(cardAmount)}
        />}
      <div style={{ opacity: endPage && 0.4 }} className="fullPageContainer">
        <div className="navbar">
          <div className={`${player === 0 ? "player choosen" : "player"}`}>Player One - {playerScores[0]}</div>
          <div className="buttonsContainer">
            <button className="cardsAmountButton" onClick={() => {resetGame(8); setCardAmount(8)}}>8</button>
            <button className="cardsAmountButton" onClick={() => {resetGame(16); setCardAmount(16)}}>16</button>
            <button className="cardsAmountButton" onClick={() =>  {resetGame(32); setCardAmount(32)}}>32</button>
          </div>
          <div className={`${player === 1 ? "player choosen" : "player"}`}>Player Two - {playerScores[1]}</div>
        </div>
        <div className="cards" style={{ "--colums": cards.length === 32 && 8 }}>
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
