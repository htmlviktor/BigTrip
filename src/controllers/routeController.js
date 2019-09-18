import Menu from "../components/menu";
import {dataMenu} from "../data";
import {dataFilters} from "../data";
import Filter from "../components/filter";
import {render, Position} from "../utils/utils";

export default class MenuController {
  constructor(container, changeScreen) {
    this._container = container;

    this._menu = new Menu(dataMenu);
    this._filter = new Filter(dataFilters);

    this.changeScreen = changeScreen;
  }

  init() {
    render(this._container, this._menu.getElement(), Position.BEFORE_END);
    render(this._container, this._filter.getElement(), Position.AFTER_END);

    this.bind();
  }

  bind() {
    this._menu.getElement().addEventListener(`click`, this.changeScreen);
  }

}
