import {makeCard} from "./components/card";
import {makeCardCreate} from "./components/card-create";
import {makeFilters} from "./components/filters";
import {makeInfoTrip} from "./components/trip-info";
import {makeMenu} from "./components/menu";
import {makeSorting} from "./components/sorting";
import {makeTripDays} from "./components/trip-days-container";

import {renderComponents} from "./utils/utils";


const tripContainer = document.querySelector('.trip-main__trip-info');
const tripControlsContainer = document.querySelector('.trip-main__trip-controls');
const tripContentContainer = document.querySelector('.trip-events');

renderComponents(tripContainer, makeInfoTrip(), 'afterbegin');
renderComponents(tripControlsContainer, makeMenu());
renderComponents(tripControlsContainer, makeFilters());
renderComponents(tripContentContainer, makeSorting());

renderComponents(tripContentContainer, makeTripDays());


const renderCards = (counter) => {
  const tripDayContainer = document.querySelector('.trip-events__list');
  renderComponents(tripDayContainer, makeCardCreate());
  for (let i = 0; i < counter; i++) {
    renderComponents(tripDayContainer, makeCard());
  }
};

renderCards(5)
