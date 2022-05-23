import React from "react";
import "./Cards.css";

function Cards({name, Key, Onclick, flip, flipHandler}) {

  function addclass() {
    if(flip)
    {
      return "card-inner transform"
    }
    return "card-inner"
  }

  return (
    <div className={`card`} onClick={()=> Onclick(name, Key, flip)}>
      <div className={addclass()}>
        <div className="front">{`${Key} ${name}`}</div>
        <div className="back">back</div>
      </div>
    </div>
  );
}

export default Cards;
