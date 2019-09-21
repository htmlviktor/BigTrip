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

  static createAdapter(obj) {
    const destination = model.destinations.find((dest) => dest.name === obj.name);
    const {offers} = model.offers.find((offer) => offer.type === obj.type);
    return {
      'base_price': Number(obj.price),
      'date_from': new Date(Number(obj.dateFrom)).toISOString(),
      'date_to': new Date(Number(obj.dateTo)).toISOString(),
      'destination': {...destination},
      'offers': offers,
      'type': obj.type,
      'is_favorite': false
    };
  }

};
