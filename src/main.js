import {makeCard} from "./components/card";
import {makeFilters} from "./components/filters";
import {makeInfoTrip} from "./components/trip-info";
import {makeMenu} from "./components/menu";
import {makeSorting} from "./components/sorting";
import {makeTripDays} from "./components/trip-days-container";

import {renderComponents, Position, renderTemplate} from "./utils/utils";
import {dataTasks, dataFilters, dataMenu} from "./data";

import Card from "./components/card";
import CardEdit from "./components/card-create";

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
  dataTasks.forEach((taskData) => {
    const card = new Card(taskData);
    const cardEdit = new CardEdit(taskData);
    renderTemplate(tripDayContainer, card.getElement(), Position.AFTER_END);

    card.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        tripDayContainer.replaceChild(cardEdit.getElement(), card.getElement());
      });
    cardEdit.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        tripDayContainer.replaceChild(card.getElement(), cardEdit.getElement());
      });
    cardEdit.getElement().querySelector(`form`)
      .addEventListener(`submit`, () => {
        tripDayContainer.replaceChild(card.getElement(), cardEdit.getElement());
      });
  });
};

const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = dataTasks.map(({price}) => price).reduce((acc, cur) => acc + cur);

renderCards(5);
