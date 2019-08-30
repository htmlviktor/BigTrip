import AbstractComponent from "../components/abstract-component";
import Day from "../components/day";
import {render, Position} from "../utils/utils";
import PointController from "./point-controller";
import Sort from "../components/sorting";
import DaysContainer from "../components/days-container";

export default class TripController extends AbstractComponent {
  constructor(container, data, dates) {
    super();
    this._container = container;
    this._data = data;
    this._dates = dates;
    this._sort = new Sort();
    this._daysContainer = new DaysContainer();
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFORE_END);
    render(this._container, this._daysContainer.getElement(), Position.AFTER_END);
    this.renderDays();

    this._sort.getElement().addEventListener(`change`, (evt) => {
      this.onSort(evt.target.dataset.sort);
    });
  }

  renderDays() {
    this._dates.forEach((date, index) => {
      const day = new Day(date, index);
      render(this._daysContainer.getElement(), day.getElement(), Position.AFTER_END);
      this.renderCards(
          day.getElement().querySelector(`.trip-events__list`),
          this._data.filter((it) => it.date === date));
    });
  }

  renderCards(container, data) {
    data.forEach((card) => new PointController(container, card));
  }

  onSort(type) {
    this._daysContainer.getElement().innerHTML = ``;
    const day = new Day();
    render(this._daysContainer.getElement(), day.getElement(), Position.BEFORE_END);
    switch (type) {
      case `time`:
        const sortByTime = [...this._data.sort()];
        this.renderCards(day.getElement().querySelector(`.trip-events__list`), sortByTime);
        break;
      case `price`:
        const sortByPrice = [...this._data.sort((a, b) => a.price < b.price)];
        this.renderCards(day.getElement().querySelector(`.trip-events__list`), sortByPrice);
        break;
      default:
        this.renderDays();
    }
  }

}
