const names = ["test1", "test2","test3","test4","test5","test6","test7","test8","test9","test10","test11","test12","test13","test14","test15","test16", "test17","test18",]
export function cardsInformation(number) {
  let cardsInfo = []
  let numbersArr = []
  while (numbersArr.length !== number) {
    const testNumber = Math.floor(Math.random() * names.length)
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
