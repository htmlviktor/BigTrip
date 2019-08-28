import {createElement} from "../utils/utils";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`This is not a constructor class`);
    }
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    throw new Error(`This is a not constructor method`);
  }
}
