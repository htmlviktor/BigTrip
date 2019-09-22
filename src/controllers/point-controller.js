import AbstractComponent from "../components/abstract-component";
import {render, Position} from "../utils/utils";
import Card from "../components/card";
import CardEdit from "../components/card-edit";
import {flatWithCard} from "../utils/flatpickr";

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import ModelPoint from "../api/model-adapter";


export default class PointController extends AbstractComponent {
  constructor(container, model, data, onChangeData, onChangeView) {
    super();
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReplace = this.onReplace.bind(this);
    this.getDestination = this.getDestination.bind(this);

    this._container = container;
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data, model);
    this.onChangeData = onChangeData;
    this.onChangeView = onChangeView;
    this.create();

  }


  create() {
    const card = this._card.getElement();
    const cardEdit = this._cardEdit.getElement();

    render(this._container, this._card.getElement(), Position.AFTER_END);
    flatWithCard(cardEdit.querySelectorAll(`.event__input--time`));

    cardEdit.querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this.onDelete);

    cardEdit.querySelector(`form`)
      .addEventListener(`submit`, this.onUpdate);

    card.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this.onReplace);

    cardEdit.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this.onReplace);
  }

  onUpdate(evt) {
    evt.preventDefault();
    const entry = new FormData(this._cardEdit.getElement().querySelector(`form`));
    const obj = Object.assign({},
        this._data.toRAW(),
        ModelPoint.updateAdapter(entry, this.getDestination));

    this.onChangeData(`update`, obj);
  }

  onDelete(evt) {
    evt.preventDefault();
    this.onChangeData(`delete`, this._data);
  }
  onReplace(evt) {
    switch (evt.currentTarget.parentElement.className) {
      case `event`:
        this.onChangeView();
        this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
        break;
      case `event__header`:
        this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
        break;
    }
  }

  getDestination() {
    const cardEdit = this._cardEdit.getElement();
    return {
      description: cardEdit.querySelector(`.event__destination-description`).textContent,
      pictures: Array.from(cardEdit.querySelectorAll(`.event__photos-tape > img`))
        .map((picture) => {
          return {
            src: picture.src,
            description: picture.alt
          };
        }),
    };
  }

  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }

}
