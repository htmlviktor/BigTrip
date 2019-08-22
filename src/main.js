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


const renderCards = (data) => {
  const tripDayContainer = document.querySelector(`.trip-events__list`);
  if (data.length === 0) {
    tripContentContainer.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
  data.forEach((taskData) => {
    const card = new Card(taskData);
    const cardEdit = new CardEdit(taskData);

    const replaceCard = () => {
      tripDayContainer.replaceChild(card.getElement(), cardEdit.getElement());
    };

    const replaceCardEdit = () => {
      tripDayContainer.replaceChild(cardEdit.getElement(), card.getElement());
    };

    const onCloseCard = (evt) => {
      if (evt.key === `Escape`) {
        replaceCard();
        document.removeEventListener(`keydown`, onCloseCard);
      }
    };


    renderTemplate(tripDayContainer, card.getElement(), Position.AFTER_END);
    card.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        replaceCardEdit();
        document.addEventListener(`keydown`, onCloseCard);
      });


    cardEdit.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, replaceCard);

    cardEdit.getElement().querySelector(`form`)
      .addEventListener(`submit`, replaceCard);

  });
};

const priceElement = document.querySelector(`.trip-info__cost-value`);
priceElement.textContent = dataTasks.map(({price}) => price).reduce((acc, cur) => acc + cur);

renderCards(dataTasks);
