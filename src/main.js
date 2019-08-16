import {makeCard} from "./components/card";
import {makeCardCreate} from "./components/card-create";
import {makeFilters} from "./components/filters";
import {makeInfoTrip} from "./components/trip-info";
import {makeMenu} from "./components/menu";
import {makeSorting} from "./components/sorting";
import {makeTripDays} from "./components/trip-days-container";

import {renderComponents} from "./utils/utils";
import {dataTasks, dataFilters, dataMenu} from "./data";

const tripContainer = document.querySelector(`.trip-main__trip-info`);
const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
const tripContentContainer = document.querySelector(`.trip-events`);

const cities = new Set(dataTasks.map((task) => task.city));


renderComponents(tripContainer, makeInfoTrip(Array.from(cities)), `afterbegin`);
renderComponents(tripControlsContainer, makeMenu(dataMenu));
renderComponents(tripControlsContainer, makeFilters(dataFilters));
renderComponents(tripContentContainer, makeSorting());

renderComponents(tripContentContainer, makeTripDays());


const renderCards = () => {
  const tripDayContainer = document.querySelector(`.trip-events__list`);
  renderComponents(tripDayContainer, makeCardCreate(dataTasks[0]));
  dataTasks.forEach((task) => renderComponents(tripDayContainer, makeCard(task)));
};

const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = dataTasks.map(({price}) => price).reduce((acc, cur) => acc + cur);

renderCards(5);
