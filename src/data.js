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
  time: {
    start: new Date(Math.floor(Math.random() * 24 / 100)).getHours(),
    end: new Date(Math.floor(Math.random() * 24 / 100)).getHours() + 1,
  },
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

const makeTasks = (count) => {
  const array = new Array();
  for (let i = 0; i < count; i++) {
    array[i] = makeData();
  }
  return array;
};

export const dataTasks = makeTasks(4);

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

