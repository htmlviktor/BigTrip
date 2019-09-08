export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.isFavorite = data[`is_favorite`];
    this.offers = data[`offers`];
    this.type = data[`type`];
    this.date = {
      from: data[`date_from`],
      to: data[`date_to`],
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

};
