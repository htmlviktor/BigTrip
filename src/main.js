import {render, Position} from "./utils/utils";
import {data, dataFilters, dataMenu, cities, dates} from "./data";
import InfoTrip from "./components/trip-info";
import Stats from "./components/stats";
import Menu from "./components/menu";
import Filter from "./components/filter";
import TripController from "./controllers/trip-controller";
import API from "./api/api";

const tripEvents = document.querySelector(`.trip-events`);
const tripContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls`);
const routeContainer = document.querySelector(`.route__container`);



render(tripContainer, new InfoTrip(cities, dates).getElement(), Position.BEFORE_END);
render(menuContainer, new Menu(dataMenu).getElement(), Position.BEFORE_END);
render(menuContainer, new Filter(dataFilters).getElement(), Position.AFTER_END);


const api = new API();


const tripController = new TripController(tripEvents, data);

api.getPoints().then((res) => tripController.init(res));

const navigation = document.querySelector(`.trip-controls__trip-tabs`);
const addButton = document.querySelector(`.trip-main__event-add-btn`);

addButton.addEventListener(`click`, () => {
  tripController.addEvent();
});

navigation.addEventListener(`click`, (evt) => {
  switch (evt.target.textContent) {
    case `Stats`:
      evt.preventDefault();
      tripController.hide();
      stats.show();
      break;
    case `Table`:
      evt.preventDefault();
      stats.hide();
      tripController.show();
      break;
  }
});


const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = data.map(({price}) => price).reduce((acc, cur) => acc + cur);


const stats = new Stats(data);
render(routeContainer, stats.getElement(), Position.AFTER_END);


