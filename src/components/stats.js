import AbstractComponent from "./abstract-component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class Stats extends AbstractComponent {
  constructor({points}) {
    super();
    this._points = points;
  }

  getChart() {
    const labels = Array.from(new Set(this._points.map(({type}) => type)));
    const data = labels.map((it) => {
      return this._points.filter((point) => point.type === it).reduce((acc, val) => val.price + acc, 0);
    });
    const ctx = this.getElement().querySelector(`.statistics__chart--money`);
    const myBarChart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          label: false,
          data,
          backgroundColor: `#ffd054`,
          borderWidth: 1,
          borderColor: `#424242`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter(value) {
              return `$ ${value}`;
            },
            align: `end`,
            clamp: true,
            backgroundColor: `#078ff0d4`,
            borderWidth: 1,
            borderColor: `#424242`,
            font: {
              size: 17
            },
            color: `#fff`
          }
        },
      },


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
