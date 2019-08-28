import AbstractComponent from "./abstract-component";

export default class Card extends AbstractComponent{
  constructor({type, date, price}) {
    super();
    this._type = type;
    this._date = date;
    this._price = price;
  }

  getTemplate() {
    return `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">Title for this</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">${new Date(this._date).getHours()}:00</time>
                        —
                        <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(this._date).getHours() + 1}:00</time>
                      </p>
                      <p class="event__duration">1H 30M</p>
                    </div>

                    <p class="event__price">
                      €&nbsp;<span class="event__price-value">${this._price}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      <li class="event__offer">
                        <span class="event__offer-title">Order Uber</span>
                        +
                        €&nbsp;<span class="event__offer-price">20</span>
                       </li>
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`;
  }

};
