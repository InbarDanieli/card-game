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
  const [isLoading, setLoading] = useState(false)
  const [isreset, setReset] = useState(false)

  // take this solution from https://shaquillegalimba.medium.com/how-to-import-multiple-images-in-react-1936efeeae7b
  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => { images[index] = { id: r(item) } });
    return images
  }

  useEffect(() => {
    setLoading(true)
    fetch("https://cataas.com/api/cats?tags=cute")
      .then((res) => res.json())
      .then((res) => res.filter((cat) => !(cat.tags.includes("gif"))))
      .then((res) => res.map((cat) => ({ ...cat, id: `https://cataas.com/cat/${cat.id}` })))
      .catch((error) => {
        return importAll(require.context('../../assets/cats-images', false, /\.(png|jpe?g|svg)$/));
      })
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
          <div className={`${player === 0 ? "player choosen" : "player"}`}>Player One - {playerScores[0]}</div>
          <div className="buttonsContainer">
            <button className="cardsAmountButton" onClick={() => { setReset(!isreset); setCardAmount(8) }}>8</button>
            <button className="cardsAmountButton" onClick={() => { setReset(!isreset); setCardAmount(16) }}>16</button>
            <button className="cardsAmountButton" onClick={() => { setReset(!isreset); setCardAmount(32) }}>32</button>
          </div>
          <div className={`${player === 1 ? "player choosen" : "player"}`}>Player Two - {playerScores[1]}</div>
        </div>
        {isLoading && <div className="loading"><p>loading...</p></div>}
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
