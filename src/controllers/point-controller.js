import AbstractComponent from "../components/abstract-component";
import {render, Position} from "../utils/utils";
import Card from "../components/card";
import CardEdit from "../components/card-edit";

export default class PointController extends AbstractComponent {
  constructor(container, data, onDateChange) {
    super();
    this._container = container;
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this.onDateChange = onDateChange;
    this.create();
  }

  create() {
    const card = this._card.getElement();
    const cardEdit = this._cardEdit.getElement();
    render(this._container, this._card.getElement(), Position.AFTER_END);

    card.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
        console.log(this._data);
      });
    cardEdit.querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
      });
    cardEdit.querySelector(`form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const entry = new FormData(cardEdit.querySelector(`form`));
      });
  };
}
