import TripController from "./trip-controller";
import MenuController from "./menu-controller";
import InfoController from "./info-controller";
import StatsController from "./stats-controller";

export default class AppController {
  constructor(mainContainer, menuContainer, eventsContainer, routeContainer, model) {
    this._mainContainer = mainContainer;
    this._subscriptions = [];
    this.onSubscribe = this.onSubscribe.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this._model = model;

    this.infoController = new InfoController(mainContainer, model);
    this.menuController = new MenuController(menuContainer, this.changeScreen);
    this.tripController = new TripController(eventsContainer, model, this.onChangeData);
    this.statController = new StatsController(routeContainer, model);
  }

  init() {
    this.initializeControllers();
    this.bind();

    this._subscriptions.push(this.infoController.update.bind(this.infoController));
  }

  onSubscribe() {
    this._subscriptions.forEach((fn) => fn());
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

  onChangeData(type, data) {
    switch (type) {
      case `update`:
        this._model.updatePoint(data).then(() => {
          this.tripController.onSort();
          this.onSubscribe();
        });
        break;
      case `create`:
        console.log(data);
        break;
      case `delete`:
        this._model.deletePoint(data).then((res) => {
          this.tripController.onSort();
          this.onSubscribe();
        });
    }

  }

  bind() {
    this._mainContainer.querySelector(`.trip-main__event-add-btn`)
      .addEventListener(`click`, this.tripController.addEvent);
  }
};
