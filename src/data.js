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
  city: new Set([
    `Amsterdam`,
    `Wroclaw`,
    `Prague`,
    `Kiev`,
  ]),
  photo: [`http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`],
  description: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna,
   non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`],
  price: Math.floor(Math.random() * 400),
  time: {
    start: new Date(Math.floor(Math.random() * 24 / 100)).getHours(),
    end: new Date(Math.floor(Math.random() * 24 / 100)).getHours() + 1,
  },
  options: [
    {
      title: `Add luggage`,
      price: 10,
      status: Math.floor(Math.random()) ? true : false,
    },
    {
      title: `Switch to comfort class`,
      price: 150,
      status: Math.floor(Math.random()) ? true : false,
    },
    {
      title: `Add meal`,
      price: 2,
      status: Math.floor(Math.random()) ? true : false,
    },
    {
      title: `Choose seats`,
      price: 9,
      status: Math.floor(Math.random()) ? true : false,
    },
  ].slice(Math.floor(Math.random() * 3))
});

const makeTasks = (count) => {
  const array = new Array();
  for (let i = 0; i < count; i++) {
    array[i] = makeData();
  }
  return array;
};

export const dataTasks = makeTasks(4);
console.log(dataTasks)
