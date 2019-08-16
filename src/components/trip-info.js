export const makeInfoTrip = (cities) => {
  return `<div class="trip-info__main">
              <h1 class="trip-info__title">${cities.length > 3 ? `${cities[0]} — ... — ${cities[cities.length - 1]}`
    : cities.map((city) => `${city} - `).join(``).slice(0, -2)}</h1>
              <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
            </div>`;
};
