import React, { useState } from "react";
import "./Game.css";
import Card from "../card/Card";
import { cardsInformation } from "../../services/CardsInformation";

const cardsInfo = cardsInformation

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

  return (
    <>
      {score}
      <hr/>
    <div className="cards">
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
