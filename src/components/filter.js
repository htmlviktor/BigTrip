import AbstractComponent from "./abstract-component";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
  ${this._filters.map((filter) => `<div class="trip-filters__filter">
                <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" checked="">
                <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
              </div>`).join(``)}
              

              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
  }
};
