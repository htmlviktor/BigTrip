import AbstractComponent from "./abstract-component";
import Chart from'chart.js';

export default class Stats extends AbstractComponent {
  constructor() {
    super();
  }

  hide() {
    this._element.classList.add(`visually-hidden`);
  }

  show() {
    this._element.classList.remove(`visually-hidden`);
  }

  getTemplate() {
    return `<section class="statistics visually-hidden">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
  }
};
