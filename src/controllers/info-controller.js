import InfoTrip from "../components/trip-info";
import {render, Position} from "../utils/utils";

export default class InfoController {
  constructor(container, {cities, dates, cost}) {
    this._container = container;
    this._cost = cost; // Временно, нужно вынести в отдельный компонент.
    this.info = new InfoTrip(cities, dates);
  }

  init() {
    render(this._container, this.info.getElement(), Position.BEFORE_END);
    document.querySelector(`.trip-info__cost-value`).textContent = this._cost; // Временно, пока нет компонента.
  }
}
