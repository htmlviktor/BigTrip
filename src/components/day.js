import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class Day extends AbstractComponent {
  constructor(date, index) {
    super();
    this._date = date.from;
    this._index = index;
  }

  getTemplate() {
    const mounth = moment(this._date).format(`MMM`).toUpperCase();
    const day = moment(this._date).format(`DD`);
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${this._date ? this._index + 1 : ``}</span>
                <time class="day__date" datetime="2019-03-18">${this._date ? `${mounth} ${day}` : ``}</time>
              </div>

              <ul class="trip-events__list">
                
              </ul>
            </li>`;
  }
}
