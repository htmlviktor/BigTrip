import AbstractComponent from "./abstract-component";

export default class InfoTrip extends AbstractComponent {
  constructor(cities, dates) {
    super();
    this._dates = dates.sort();
    this._cities = cities;
  }

  getTemplate() {
    const cities = this._cities;
    const options = {month: `short`, day: `numeric`};
    return `<div class="trip-info__main">
              <h1 class="trip-info__title">${cities.length > 3 ? `${cities[0]} — ... — ${cities[cities.length - 1]}`
    : cities.map((city) => `${city} - `).join(``).slice(0, -2)}</h1>
              <p class="trip-info__dates">${new Date(this._dates[0]).toLocaleDateString(`en-US`, options)}&nbsp;—&nbsp;
              ${new Date(this._dates[this._dates.length - 1]).toLocaleDateString(`en-US`, options)}</p>
            </div>`;
  }
};
