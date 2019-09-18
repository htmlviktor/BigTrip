import AbstractComponent from "./abstract-component";
import Chart from 'chart.js';

export default class Stats extends AbstractComponent {
  constructor(model) {
    super();
    this._model = model;
  }

  getChart() {
    const ctx = this.getElement().querySelector(`.statistics__chart--money`);
    const myBarChart = new Chart(ctx, {
      type: `horizontalBar`,
      data: {
        labels: [`FLY`, `STAY`, `DRIVE`, `LOCK`, `EAT`, `RIDE`],
        datasets: [{
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: `white`
        }]
      }
    });
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
