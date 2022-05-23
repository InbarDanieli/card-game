export function cardsInformation() {

  let cardsInfo = [
    {
      name: "inbar",
      flip: false,
    },
    {
      name: "inbar",
      flip: false,
    },
    {
      name: "omri",
      flip: false,
    },
    {
      name: "omri",
      flip: false,
    },
    {
      name: "plop",
      flip: false,
    },
    {
      name: "plop",
      flip: false,
    },
    {
      name: "bla",
      flip: false,
    },
    {
      name: "bla",
      flip: false,
    },
  ]
  cardsInfo = cardsInfo.map((value) => ({ ...value, Key: Math.random() }))
  cardsInfo = cardsInfo.sort((a, b) => a.Key - b.Key)

  return cardsInfo
}
