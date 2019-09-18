import API from "./api";

const api = new API();

export default class Model {
  constructor(points, destinations, offers) {
    this._points = points;
    this._destinations = destinations;
    this._offers = offers;

    this.getPoints = this.getPoints.bind(this);
  }

  get cities() {
    return Array.from(new Set(this._points.map(({destination}) => destination.name)));
  }

  get dates() {
    return this._points.map(({date}) => date.from);
  }

  get cost() {
    return this.points.map(({price}) => price).reduce((acc, cur) => acc + cur);
  }

  get points() {
    return this._points;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  set points(points) {
    this._points = points;
  }

  set destinations(destinations) {
    this._destinations = destinations;
  }

  set offers(offers) {
    this._offers = offers;
  }

  updatePoint(data) {
    return api.updatePoint({id: data.id, data: data.toRAW()})
      .then(() => {
        return this.getPoints().then(() => this.points);
      });
  }

  getPoints() {
    return api.getPoints().then((res) => {
      this.points = res;
    });
  }

  getDestinations() {
    return api.getDestinations().then((res) => {
      this._destinations = res;
    });
  }

  getOffers() {
    return api.getOffers().then((res) => {
      this._offers = res;
    });
  }
}
