export function getRandomInt (max: number, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export function getRandomWord (listOfWords: ReadonlyArray<string>) {
  return listOfWords[getRandomInt(listOfWords.length)];
}
