import {render, Position} from "./utils/utils";
import {data, dataFilters, dataMenu, cities, dates} from "./data";
import InfoTrip from "./components/trip-info";
import Stats from "./components/stats";

import Menu from "./components/menu";
import Filter from "./components/filter";
import TripController from "./controllers/trip-controller";

const tripEvents = document.querySelector(`.trip-events`);
const tripContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls`);
const routeContainer = document.querySelector(`.route__container`);
const infoTrip = new InfoTrip(cities, dates);
const menu = new Menu(dataMenu);
const filter = new Filter(dataFilters);
const stats = new Stats();

render(tripContainer, infoTrip.getElement(), Position.BEFORE_END);
render(menuContainer, menu.getElement(), Position.BEFORE_END);
render(menuContainer, filter.getElement(), Position.AFTER_END);

const navigation = document.querySelector(`.trip-controls__trip-tabs`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);



const tripController = new TripController(tripEvents, data, dates);
tripController.init();

addButton.addEventListener(`click`, () => {
  tripController.addEvent();
});

navigation.addEventListener(`click`, (evt) => {
  switch (evt.target.textContent) {
    case `Stats`:
      evt.preventDefault();
      tripController.hide();
      break;
    case `Table`:
      evt.preventDefault();
      tripController.show();
      break;
  }
});


const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = data.map(({price}) => price).reduce((acc, cur) => acc + cur);

render(routeContainer, stats.getElement(), Position.AFTER_END);

