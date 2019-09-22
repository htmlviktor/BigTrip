import model from "./model-all";

export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`] || null;
    this.price = data[`base_price`] || ``;
    this.destination = data[`destination`] || ``;
    this.isFavorite = data[`is_favorite`] || false;
    this.offers = data[`offers`] || [];
    this.type = data[`type`] || ``;
    this.date = {
      from: data[`date_from`] || ``,
      to: data[`date_to`] || ``,
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }

  toRAW() {
    return {
      'id': this.id,
      'base_price': this.price,
      'date_from': this.date.from,
      'date_to': this.date.to,
      'destination': this.destination,
      'is_favorite': this.isFavorite,
      'offers': this.offers,
      'type': this.type
    };
  }

  static createAdapter(entry) {
    const destination = model.destinations.find((dest) => dest.name === entry.get(`event-destination`));
    const {offers} = model.offers.find((offer) => offer.type === entry.get(`event-type`));
    return {
      'base_price': Number(entry.get(`event-price`)),
      'date_from': new Date(Number(entry.get(`event-start-time`))).toISOString(),
      'date_to': new Date(Number(entry.get(`event-end-time`))).toISOString(),
      'destination': {...destination},
      'offers': offers,
      'type': entry.get(`event-type`),
      'is_favorite': false
    };
  }

  static updateAdapter(entry, destination) {
    return {
      'base_price': Number(entry.get(`event-price`)),
      'type': entry.get(`event-type`),
      'date_from': Number(entry.get(`event-start-time`)),
      'date_to': Number(entry.get(`event-end-time`)),
      'destination': {
        ...destination(),
        name: entry.get(`event-destination`),
      }
    }
  }

};
