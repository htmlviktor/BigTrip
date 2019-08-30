import AbstractComponent from "./abstract-component";

export default class Day extends AbstractComponent {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    const options = {month: `short`, day: `numeric`};
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${this._date ? this._index + 1 : ``}</span>
                <time class="day__date" datetime="2019-03-18">${this._date ? new Date(this._date).toLocaleString(`en-US`, options) : ``}</time>
              </div>

              <ul class="trip-events__list">
                
              </ul>
            </li>`;
  }
}
