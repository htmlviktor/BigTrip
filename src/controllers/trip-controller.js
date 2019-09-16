import AbstractComponent from "../components/abstract-component";
import Day from "../components/day";
import {render, Position} from "../utils/utils";
import PointController from "./point-controller";
import Sort from "../components/sorting";
import DaysContainer from "../components/days-container";
import AddEvent from "../components/add-event";
import flatpickr from "flatpickr";
import moment from "moment";
import api from "../api/api";

export default class TripController extends AbstractComponent {
  constructor(container, model) {
    super();
    this._container = container;
    this._model = model;
    this._sort = new Sort();
    this._daysContainer = new DaysContainer();
    this._addEvent = new AddEvent();

    this._subscriptions = [];
    this.onChangeView = this.onChangeView.bind(this);
    this.onChangeData = this.onChangeData.bind(this);

    this.onAddEvent = this.onAddEvent.bind(this);
  }

  onAddEvent(evt) {
    evt.preventDefault();
    const entry = new FormData(this._addEvent.getElement());

    const obj = {
      type: entry.get(`event-type`),
      city: entry.get(`event-destination`),
      date: entry.get(`event-start-time`),
      price: entry.get(`event-price`),
      options: [],
      description: [],
      photo: []
    };
    this.onChangeData(null, obj);
    this._addEvent.getElement().removeEventListener(`submit`, this.onAddEvent);
    this._addEvent.getElement().remove();
  }

  addEvent() {
    render(this._container, this._addEvent.getElement(), Position.BEFORE_END);
    flatpickr(this._addEvent.getElement().querySelectorAll(`.event__input--time`), {
      dateFormat: `d.m.y`,
      defaultDate: Date.now(),
    });
    this._addEvent.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this._addEvent.getElement().remove();
      });
    this._addEvent.getElement().addEventListener(`submit`, this.onAddEvent);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFORE_END);
    render(this._container, this._daysContainer.getElement(), Position.AFTER_END);
    this._sort.getElement().addEventListener(`change`, this.onSort.bind(this));
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }


  renderDays(points) {
    const dates = Array.from(new Set(points.map((it) => moment(it.date.from).format(`MMM DD`))));
    dates.sort().forEach((date, index) => {
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

  onChangeData(data) {
    this._model.updatePoint(data).then((res) => {
      console.log(res);
    });
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
