import React, { useEffect, useState } from "react";
import CardCreator from "../cards-creator/CardCreator";
import Cards from "../cards/Cards";
import "./Game.css";

function Game() {
  const [cardarr, setCardArr] = useState(CardCreator());
  const [cardChoosen, setCardChoosen] = useState(false);
  const [firstCardName, setFirstCardName] = useState("");
  const [firstCardKey, setFirstCardKey] = useState();
  // const [clicked, setClicked] = useState(false);

  let cards = cardarr.map((cardInfo) => (
    <Cards
      name={cardInfo.name}
      Key={cardInfo.key}
      key={cardInfo.key}
      Onclick={clickcard}
    />
  ));
  cards = cards.sort((a, b) => a.key - b.key);

  function clickcard(cardName, key) {
    if (cardChoosen) {
      if (firstCardKey === key) {
        return;
      }

      if (firstCardName === cardName) {
        console.log("match!");
      } else {
        console.log("not match");
      }
      setCardChoosen(false);
      
    } else {
      setCardChoosen(true);
      setFirstCardName(cardName);
      setFirstCardKey(key);
    }
  }

  return <div className="cards">{cards}</div>;
}

export default Game;
