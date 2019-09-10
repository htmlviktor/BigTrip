import AbstractComponent from "../components/abstract-component";
import {render, Position} from "../utils/utils";
import Card from "../components/card";
import CardEdit from "../components/card-edit";
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export default class PointController extends AbstractComponent {
  constructor(container, data, onDataChange, onChangeView) {
    super();
    this._container = container;
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this.onDataChange = onDataChange;
    this.onChangeView = onChangeView;
    this.create();
  }


  create() {
    const card = this._card.getElement();
    const cardEdit = this._cardEdit.getElement();
    render(this._container, this._card.getElement(), Position.AFTER_END);

    cardEdit.querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this.onDataChange(this._data, null);
      });

    flatpickr(cardEdit.querySelectorAll(`.event__input--time`), {
      enableTime: true,
      dateFormat: "d.m.y",
      defaultDate: Date.now(),
    });
    card.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this.onChangeView();
        this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
      });
    cardEdit.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
      });
    cardEdit.querySelector(`form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const entry = new FormData(cardEdit.querySelector(`form`));

        const obj = Object.assign({}, this._data, {
          price: entry.get(`event-price`),
          offers: this.reloadOptions(entry.getAll(`add-option`)),
          type: entry.get(`event-type`),
          date: entry.get(`event-start-time`),
        });
        this.onDataChange(this._data, obj);
      });
    cardEdit.querySelector(`.event__type-list`)
      .addEventListener(`change`, this.changeType.bind(this));
  };

  changeType(evt) {
    const label = this._cardEdit.getElement().querySelector(`.event__label`);
    const image = this._cardEdit.getElement().querySelector(`.event__type > img`);
    const value = evt.target.value;
    switch (evt.target.parentNode.parentNode.querySelector(`legend`).textContent) {
      case `Transfer`:
        label.textContent = `${value} to `;
        image.src = `img/icons/${value}.png`
        break;
      case `Activity`:
        label.textContent = `${value} in `;
        image.src = `img/icons/${value}.png`
        break;
    }
  }

  reloadOptions(entry) {
    console.log(this._data)
    const arr = this._data.offers.map((it) => Object.assign({}, it));
    arr.forEach((it) => it.status = false);
    entry.forEach((name) => arr.find((it) => it.title === name).status = true);
    return arr;
  }

  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }

}
