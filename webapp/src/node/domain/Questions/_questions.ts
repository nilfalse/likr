interface IOption {
  readonly id: number;
  readonly image: string;
}

export interface IQuestion {
  readonly id: number;
  readonly options: Readonly<[ IOption, IOption ]>
}

export const questions: ReadonlyArray<IQuestion> = [
  {
    id: 1,
    options: [
      { id: 1, image: 'images/11.png' },
      { id: 2, image: 'images/12.png' },
    ]
  }, {
    id: 2,
    options: [
      { id: 1, image: 'images/21.png' },
      { id: 2, image: 'images/22.png' },
    ]
  }, {
    id: 3,
    options: [
      { id: 1, image: 'images/31.png' },
      { id: 2, image: 'images/32.png' },
    ]
  }, {
    id: 4,
    options: [
      { id: 1, image: 'images/41.png' },
      { id: 2, image: 'images/42.png' },
    ]
  }, {
    id: 5,
    options: [
      { id: 1, image: 'images/51.png' },
      { id: 2, image: 'images/52.png' },
    ]
  }, {
    id: 6,
    options: [
      { id: 1, image: 'images/61.png' },
      { id: 2, image: 'images/62.png' },
    ]
  }, {
    id: 7,
    options: [
      { id: 1, image: 'images/71.png' },
      { id: 2, image: 'images/72.png' },
    ]
  }, {
    id: 8,
    options: [
      { id: 1, image: 'images/81.png' },
      { id: 2, image: 'images/82.png' },
    ]
  }, {
    id: 9,
    options: [
      { id: 1, image: 'images/91.png' },
      { id: 2, image: 'images/92.png' },
    ]
  }, {
    id: 10,
    options: [
      { id: 1, image: 'images/101.png' },
      { id: 2, image: 'images/102.png' },
    ]
  }
];
