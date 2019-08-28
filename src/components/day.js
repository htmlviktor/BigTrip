import AbstractComponent from "./abstract-component";

export default class Day extends AbstractComponent {
  constructor(dates) {
    super();
    this._dates = dates.sort();
  }

  getTemplate() {
    const options = {month: `short`, day: `numeric`};
    return `<ul class="trip-days">
    ${this._dates.map((date, index) => {
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="2019-03-18">${new Date(date).toLocaleString(`en-US`, options)}</time>
              </div>

              <ul class="trip-events__list">
                
              </ul>
            </li>`;
  }).join(``)}
        </ul>`;
  }
}
