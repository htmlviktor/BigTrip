import {makeCard} from "./components/card";
import {makeCardCreate} from "./components/card-create";
import {makeFilters} from "./components/filters";
import {makeInfoTrip} from "./components/trip-info";
import {makeMenu} from "./components/menu";
import {makeSorting} from "./components/sorting";
import {makeTripDays} from "./components/trip-days-container";

import {renderComponents} from "./utils/utils";
import {dataTasks} from "./data";

const tripContainer = document.querySelector(`.trip-main__trip-info`);
const tripControlsContainer = document.querySelector(`.trip-main__trip-controls`);
const tripContentContainer = document.querySelector(`.trip-events`);

renderComponents(tripContainer, makeInfoTrip(

), `afterbegin`);
renderComponents(tripControlsContainer, makeMenu());
renderComponents(tripControlsContainer, makeFilters());
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
