import React from "react";
import "./Card.css";

function Card({ name, Key, Onclick, flip }) {
  function addclass() {
    if (flip) {
      return "card-inner transform"
    }
    return "card-inner"
  }

  return (
    <div className={`card`} onClick={() => Onclick(name, Key, flip)}>
      <div className={addclass()}>
        <div className="front"></div>
        <div className="back">{name + " " + Key}</div>
      </div>
    </div>
  );
}

export default Card;
