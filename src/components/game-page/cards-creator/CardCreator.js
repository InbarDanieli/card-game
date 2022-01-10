function CardCreator() {
  let cards = [
    { name: "inbar", rfc: "link" },
    { name: "inbar", rfc: "link" },
    { name: "pop", rfc: "link" },
    { name: "pop", rfc: "link" },
  ];

  cards = cards.map((value) => {
    return { ...value, key: Math.floor(Math.random() * 1000000) };
  });

  
  return cards
}

export default CardCreator;
