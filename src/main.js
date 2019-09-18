import Stats from "./components/stats";
import TripController from "./controllers/trip-controller";
import Model from "./api/model-all";
import AppController from "./controllers/app-controller";



const tripContainer = document.querySelector(`.trip-info`);
const menuContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const routeContainer = document.querySelector(`.route__container`);


const model = new Model();
const tripController = new TripController(tripEvents, model);




Promise.all([
  model.getOffers(),
  model.getPoints(),
  model.getDestinations()
]).then(() => {
  const appController = new AppController(tripContainer, menuContainer, tripEvents, model);
  appController.init();
});


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

