import React, { useState } from "react";
import "./Game.css";
import Cards from "../cards/Cards"
import { cardsInformation } from "../../CardsInformation";

const cardsInfo = cardsInformation

function Game() {
  const [twoCards, setTwoCards] = useState(false)
  const [info, setInfo] = useState({}) 
  const [cards, setCards] = useState(cardsInfo)

  function flipCard(Key) {
    const cardIndex = cards.findIndex((value) => value.Key === Key)
    cards[cardIndex].flip = !cards[cardIndex].flip
    setCards([...cards])
  }

  function printInfo(name, Key, flip) {
    if (flip) {
      return
    }

    if (!twoCards) {
      setInfo({ name, Key })
      setTwoCards(true)
      flipCard(Key)
      return
    }

    flipCard(Key)
    if (info.name !== name) {
      setTwoCards(false)
      setTimeout(() => {
        flipCard(info.Key)
        flipCard(Key)
      }, 1000);
    }
    setInfo({})
    setTwoCards(false)
  }

  return (
    <div className="cards">
      {cards.map((info) =>
        <Cards
          key={info.Key}
          Key={info.Key}
          name={info.name}
          flip={info.flip}
          Onclick={(name, Key, flip) => printInfo(name, Key, flip)}
        />)}
    </div>
  )
}

export default Game;
