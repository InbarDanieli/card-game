import React, { useEffect, useState } from "react";
import "./Game.css";
import Card from "../card/Card";
import { cardsInformation } from "../../services/CardsInformation";


function Game() {
  const [twoCards, setTwoCards] = useState(false)
  const [info, setInfo] = useState({})
  const [score, setScore] = useState(0)
  const [cards, setCards] = useState([])
  const [catArr, setCatArr] = useState([])
  useEffect(() => {
    fetch("https://cataas.com/api/cats?tags=cute")
      .then((res) => res.json())
      .then((res) => res.filter((cat) => !(cat.tags.includes("gif"))))
      .then((res) => { setCatArr(res); setCards(cardsInformation(4, res)) })
    }, [])
    
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
      return
    }
    // match
    setScore(score + 1)
  }

  function resetGame(cardsNumber) {
    setInfo({})
    setScore(0)
    setTwoCards(false)
    setCards(cardsInformation(cardsNumber / 2, catArr))

  }

  return (
    <>
      <div className="navbar">
        <span className="scoreboard">{score}</span>
        cards:
        <button className="cardsAmountButton" onClick={() => resetGame(8)}>8</button>
        <button className="cardsAmountButton" onClick={() => resetGame(16)}>16</button>
        <button className="cardsAmountButton" onClick={() => resetGame(32)}>32</button>
      </div>
      <hr />
      <div className="cards" style={{ "--colums": cards.length === 32 && 8 }}>
        {cards.map((info) =>
          <Card
            key={info.Key}
            Key={info.Key}
            name={info.name}
            imageID = {info.imageID}
            flip={info.flip}
            Onclick={(name, Key, flip) => printInfo(name, Key, flip)}
          />)}
      </div>
    </>
  )
}

export default Game;
