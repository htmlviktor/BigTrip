import ModelPoint from "./model-adapter";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export default class API {
  constructor() {
    this._baseUrl = `https://htmlacademy-es-9.appspot.com/big-trip/`;
    this._token = `Basic eo0w5153k29889a`;
  };

  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelPoint.parsePoints);
  };

  getDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(toJSON);
  }


  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._token);

    return fetch(`${this._baseUrl}${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
};
