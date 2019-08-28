const makeData = () => ({
  type: [
    `bus`,
    `check-in`,
    `drive`,
    `flight`,
    `restaurant`,
    `ship`,
    `sightseeing`,
    `taxi`,
    `train`,
    `transport`,
    `trip`,
  ][Math.floor(Math.random() * 10)],
  city: [
    `Amsterdam`,
    `Wroclaw`,
    `Prague`,
    `Kiev`,
  ][Math.floor(Math.random() * 4)],
  photo: [`http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`],
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Cras aliquet varius magna, non porta ligula feugiat eget. 
  Fusce tristique felis at fermentum pharetra.`],
  price: Math.floor(Math.random() * 400),
  date: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  options: [
    {
      title: `Add luggage`,
      price: 10,
      status: Boolean(Math.round(Math.random())),
    },
    {
      title: `Switch to comfort class`,
      price: 150,
      status: Boolean(Math.round(Math.random())),
    },
    {
      title: `Add meal`,
      price: 2,
      status: Boolean(Math.round(Math.random())),
    },
    {
      title: `Choose seats`,
      price: 9,
      status: Boolean(Math.round(Math.random())),
    },
  ].slice(Math.floor(Math.random() * 3)),
});


export const data = new Array(10).fill(``).map(makeData);


export const dataFilters = [`everything`, `future`, `past`];
export const dataMenu = [
  {
    title: `Table`,
    status: true,
  },
  {
    title: `Stats`,
    status: false,
  },
];

export const cities = Array.from(new Set(data.map((task) => task.city)));
export const dates = Array.from(new Set(data.map((it) => it.date)));
