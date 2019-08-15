export const renderComponents = (container, node, position = `beforeend`) => {
  container.insertAdjacentHTML(position, node);
};
