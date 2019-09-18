import Stats from "../components/stats";
import {Position, render} from "../utils/utils";

export default class StatsController {
  constructor(container, model) {
    this._container = container;
    this.stats = new Stats(model);
  }

  init() {
    render(this._container, this.stats.getElement(), Position.AFTER_END);
  }

  hide() {
    this.stats.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this.stats.getElement().classList.remove(`visually-hidden`);
  }
}
