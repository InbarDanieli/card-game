const names = ["inbar", "omri", "plop", "bla", "mipmop"]
export function cardsInformation(number = 4) {
  let cardsInfo = []
  let numbersArr = []
  while (numbersArr.length !== number) {
    const testNumber = Math.floor(Math.random() * 5)
    if (numbersArr.find((value) => value === testNumber) === undefined) {
      numbersArr.push(testNumber)
    }
  }

  for (let i = 0; i < number; i++) {
    const cardInfo = { name: names[numbersArr[i]], flip: false }
    cardsInfo.push({ ...cardInfo }, { ...cardInfo })
  }

  cardsInfo = cardsInfo.map((value) => ({ ...value, Key: Math.random() }))
  cardsInfo = cardsInfo.sort((a, b) => a.Key - b.Key)
  console.log(cardsInfo);
  return cardsInfo
}
