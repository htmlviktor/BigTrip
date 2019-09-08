import AbstractComponent from "./abstract-component";
import moment from "moment";

export default class Card extends AbstractComponent{
  constructor({type, date, price, offers, destination}) {
    super();
    this._type = type;
    this._date = date;
    this._price = price;
    this._offers = offers;
    this._destination = destination;
  }

  optionsView(offers) {
    return offers.map((offer) => {
      return offer.accepted ? `<li class="event__offer">
                        <span class="event__offer-title">${offer.title}</span>
                        +
                        €&nbsp;<span class="event__offer-price">${offer.price}</span>
                       </li>` : ``;
    }).join(``);
  }

  getTemplate() {
    return `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${this._type}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-18T10:30">${moment(this._date.from).format(`HH:mm`)}</time>
                        —
                        <time class="event__end-time" datetime="2019-03-18T11:00">${moment(this._date.to).format(`HH:mm`)}</time>
                      </p>
                      <p class="event__duration">1H 30M </p>
                    </div>

                    <p class="event__price">
                      €&nbsp;<span class="event__price-value">${this._destination.basePrice}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${this.optionsView(this._offers)}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`;
  }

};
