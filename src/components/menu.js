import AbstractComponent from "./abstract-component";

export default class Menu extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${this._data.map(({title, status}) => `<a class="trip-tabs__btn  ${status ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`).join(``)}
            </nav>`;
  }
};
