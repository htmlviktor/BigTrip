import model from "./api/model-all";
import AppController from "./controllers/app-controller";


const mainContainer = document.querySelector(`.trip-main`);
const menuContainer = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const routeContainer = document.querySelector(`.route__container`);


Promise.all([
  model.getOffers(),
  model.getPoints(),
  model.getDestinations()
]).then(() => {
  const appController = new AppController(mainContainer, menuContainer, tripEvents, routeContainer, model);
  appController.init();
});


