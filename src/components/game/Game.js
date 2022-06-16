import React, { useState } from "react";
import "./Game.css";
import Card from "../card/Card";
import { cardsInformation } from "../../services/CardsInformation";

const cardsInfo = cardsInformation(4)

function Game() {
  const [twoCards, setTwoCards] = useState(false)
  const [info, setInfo] = useState({})
  const [cards, setCards] = useState(cardsInfo)
  const [score, setScore] = useState(0)


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
    setCards(cardsInformation(cardsNumber / 2))

  }

  return (
    <>
      {score}
      <button onClick={() => resetGame(8)}>8 cards</button>
      <button onClick={() => resetGame(16)}>16 cards</button>
      <button onClick={() => resetGame(32)}>32 cards</button>
      <hr />
      <div className="cards" style={{"--colums": cards.length === 32 && 8}}>
        {cards.map((info) =>
          <Card
            key={info.Key}
            Key={info.Key}
            name={info.name}
            flip={info.flip}
            Onclick={(name, Key, flip) => printInfo(name, Key, flip)}
          />)}
      </div>
    </>
  )
}

export default Game;
