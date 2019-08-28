import {render, Position} from "./utils/utils";
import {data, dataFilters, dataMenu, cities, dates} from "./data";
import InfoTrip from "./components/trip-info";

import Menu from "./components/menu";
import Filter from "./components/filter";
import TripController from "./controllers/trip-controller";


const tripEvents = document.querySelector(`.trip-events`);
const tripContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls`);
const infoTrip = new InfoTrip(cities, dates);
const menu = new Menu(dataMenu);
const filter = new Filter(dataFilters);

render(tripContainer, infoTrip.getElement(), Position.BEFORE_END);
render(menuContainer, menu.getElement(), Position.BEFORE_END);
render(menuContainer, filter.getElement(), Position.AFTER_END);

const tripController = new TripController(tripEvents, data, dates);
tripController.init();



const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = data.map(({price}) => price).reduce((acc, cur) => acc + cur);


