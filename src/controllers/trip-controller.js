import AbstractComponent from "../components/abstract-component";
import Day from "../components/day";
import {render, Position} from "../utils/utils";
import PointController from "./point-controller";


export default class TripController extends AbstractComponent {
  constructor(container, data, dates) {
    super();
    this._container = container;
    this._data = data;
    this._dates = dates;
    this._day = new Day(dates);
  }

  init() {
    render(this._container, this._day.getElement(), Position.BEFORE_END);
    this.renderCards();
  }

  renderCards() {
    const daysElement = this._container.querySelectorAll(`.trip-days__item > .trip-events__list`);
    this._dates.forEach((date, index) => {
      this._data.filter((it) => it.date === date)
        .forEach((point) => {
          const card = new PointController(daysElement[index], point, this.onDateChange.bind(this));
        });
    });
  }

  onDateChange(data) {
    console.log(this._data);
  }
}
