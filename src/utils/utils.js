export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
}

export const Position = {
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`,
  AFTER: `after`
}

export const render = (container, element, position) => {
  switch (position) {
    case `afterend`:
      container.append(element);
      break;
    case `beforeend`:
      container.prepend(element);
      break;
    case `after`:
      container.after(element);
  }
}
