export const makeMenu = (menu) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menu.map(({title, status}) => `<a class="trip-tabs__btn  ${status ? `trip-tabs__btn--active` : ``}" href="#">${title}</a>`).join(``)}
            </nav>`;
};
