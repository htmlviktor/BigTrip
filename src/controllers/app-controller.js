import TripController from "./trip-controller";
import MenuController from "./routeController";
import InfoController from "./info-controller";
import StatsController from "./stats-controller";

export default class AppController {
  constructor(tripContainer, menuContainer, eventsContainer, routeContainer, model) {

    this.infoController = new InfoController(tripContainer, model);
    this.menuController = new MenuController(menuContainer, this.changeScreen.bind(this));
    this.tripController = new TripController(eventsContainer, model);
    this.statController = new StatsController(routeContainer, model);
  }

  init() {
    this.initializeControllers();
  }

  initializeControllers() {

    this.infoController.init();
    this.menuController.init();
    this.tripController.init();
    this.statController.init();
  }

  changeScreen(evt) {
    const temp = evt.target;
    switch (temp.textContent) {
      case `Table`:
        this.tripController.show();
        this.statController.hide();
        break;
      case `Stats`:
        this.tripController.hide();
        this.statController.show();
        break;
    }
  }
};
