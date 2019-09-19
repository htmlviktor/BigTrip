import InfoTrip from "../components/trip-info";
import {render, Position} from "../utils/utils";

export default class InfoController {
  constructor(container, model) {
    this._container = container;
    this._model = model;
    this.info = new InfoTrip(model.cities, model.dates);
  }

  init() {
    render(this._container.querySelector(`.trip-info`), this.info.getElement(), Position.BEFORE_END);
    this.update();
  }

  update() {
    this._container.querySelector(`.trip-info__cost-value`).textContent = this._model.cost;
  }

}
