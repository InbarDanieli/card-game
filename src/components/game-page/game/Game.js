import React, { useState } from "react";
import "./Game.css";
import Cards from "../cards/Cards"

const cardsInfo = [
  {
    name: "inbar",
    Key: 1,
    flip: false
  },
  {
    name: "inbar",
    Key: 2,
    flip: false
  },
  {
    name: "omri",
    Key: 3,
    flip: false
  },
  {
    name: "omri",
    Key: 4,
    flip: false
  },
]


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
      flipCard(info.Key)
      flipCard(Key)
    }
    setInfo({})
    setTwoCards(false)
  }

  return (
    <>
      {cards.map((info) =>
        <Cards
          key={info.Key}
          Key={info.Key}
          name={info.name}
          flip={info.flip}
          Onclick={(name, Key, flip) => printInfo(name, Key, flip)}
        />)}
    </>
  )
}

export default Game;
