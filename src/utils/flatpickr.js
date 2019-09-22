import flatpickr from "flatpickr";

const flatWithCard = (container) => {
  flatpickr(container, {
    enableTime: true,
    dateFormat: `U`,
    altInput: true,
    altFormat: `d.m.y`,
    defaultDate: Date.now(),
  });
};

export {
  flatWithCard
};
