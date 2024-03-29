import React from "react";
import "./Card.scss";

function Card({ name, Key, Onclick, flip, imageID }) {
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
        <div className="back" style={{background: `url(${imageID})`}}>
          {/* {name + " " + Key} */}
        <img className="catImage" src={imageID} alt="cute"></img>
        </div>
      </div>
    </div>
  );
}

export default Card;
