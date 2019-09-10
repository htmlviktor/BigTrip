import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class Day extends AbstractComponent {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${this._date ? this._index + 1 : ``}</span>
                <time class="day__date" datetime="2019-03-18">${this._date ? `${moment(this._date).format(`MMM DD`)}` : ``}</time>
              </div>
              <ul class="trip-events__list">
                
              </ul>
            </li>`;
  }
}
