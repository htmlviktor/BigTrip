import API from "./api";

const api = new API();

export default class Model {
  constructor(points, destinations, offers) {
    this._points = points;
    this._destinations = destinations;
    this._offers = offers;
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

  getPoints() {
    return api.getPoints().then((res) => {
      this.points = res;
      return res;
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
