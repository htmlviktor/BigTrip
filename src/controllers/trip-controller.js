import AbstractComponent from "../components/abstract-component";
import Day from "../components/day";
import {render, Position} from "../utils/utils";
import PointController from "./point-controller";
import Sort from "../components/sorting";
import DaysContainer from "../components/days-container";
import AddEvent from "../components/add-event";
import flatpickr from "flatpickr";
import moment from "moment";
import ModelPoint from "../api/model-adapter";


export default class TripController extends AbstractComponent {
  constructor(container, model, onChangeData) {
    super();
    this._container = container;
    this._model = model;
    this._sort = new Sort();
    this._daysContainer = new DaysContainer();
    this._addEvent = new AddEvent(model);

    this._subscriptions = [];
    this.onChangeView = this.onChangeView.bind(this);
    this.onChangeData = onChangeData;

    this.addEvent = this.addEvent.bind(this);
    this.onCreateEvent = this.onCreateEvent.bind(this);
    this.hide = this.hide.bind(this);

  }

  onCreateEvent(evt) {
    evt.preventDefault();
    const entry = new FormData(evt.currentTarget);
    const model = ModelPoint.createAdapter({
      price: entry.get(`event-price`),
      name: entry.get(`event-destination`),
      dateFrom: entry.get(`event-start-time`),
      dateTo: entry.get(`event-end-time`),
      type: this._addEvent.getElement().querySelector(`.event__type-input:checked`).value,
      offers: [],
    });

    this.onChangeData(`create`, model);
    this._addEvent.getElement().removeEventListener(`submit`, this.onCreateEvent);
    this._addEvent.getElement().reset();
    this._addEvent.getElement().remove();
  }

  addEvent() {
    render(this._sort.getElement(), this._addEvent.getElement(), Position.AFTER);
    flatpickr(this._addEvent.getElement().querySelectorAll(`.event__input--time`), {
      enableTime: true,
      dateFormat: `U`,
      altInput: true,
      altFormat: `d.m.y`,
      defaultDate: Date.now(),
    });
    this._addEvent.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this._addEvent.getElement().remove();
      });
    this._addEvent.getElement().addEventListener(`submit`, this.onCreateEvent);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFORE_END);
    render(this._container, this._daysContainer.getElement(), Position.AFTER_END);
    this._sort.getElement().addEventListener(`change`, this.onSort.bind(this));

    this.renderDays(this._model.points);
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }


  renderDays(points) {
    const dates = Array.from(new Set(points.map((it) => moment(it.date.from).format(`MMM DD`)))).sort();
    dates.forEach((date, index) => {
      const day = new Day(date, index);
      render(this._daysContainer.getElement(), day.getElement(), Position.AFTER_END);
      this.renderCards(
          day.getElement().querySelector(`.trip-events__list`),
          points.filter((it) => moment(it.date.from).format(`MMM DD`) === date));
    });
  }

  renderCards(container, data) {
    data.forEach((card) => {
      const pointController = new PointController(container, this._model, card, this.onChangeData, this.onChangeView);
      this._subscriptions.push(pointController.setDefaultView.bind(pointController));
    });
  }

  onSort() {
    this._daysContainer.getElement().innerHTML = ``;
    const day = new Day();
    render(this._daysContainer.getElement(), day.getElement(), Position.BEFORE_END);
    switch (this._sort.getElement().querySelector(`.trip-sort__input:checked`).dataset.sort) {
      case `time`:
        const sortByTime = [...this._model.points.sort()];
        this.renderCards(day.getElement().querySelector(`.trip-events__list`), sortByTime);
        break;
      case `price`:
        const sortByPrice = [...this._model.points.sort((a, b) => b.price - a.price)];
        this.renderCards(day.getElement().querySelector(`.trip-events__list`), sortByPrice);
        break;
      default:
        this.renderDays(this._model.points);
    }
  }


  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
