import React, { useState } from "react";
import "./Cards.css";

function Cards(props) {
  const [flip, setFlip] = useState("card-inner");

  function addclass() {
    setFlip(`${flip} transform`)
  }

  return (
    <div className={`card`} onClick={()=> props.Onclick(props.name, props.Key)}>
      <div className={flip} onClick={addclass}>
        <div className="front">{`${props.Key} ${props.name}`}</div>
        <div className="back">back</div>
      </div>
    </div>
  );
}

export default Cards;
