export const changePriceNameUrl = (form: HTMLFormElement) => {
  const minPrice = form.querySelector('input[data-index="0"]');
  const maxPrice = form.querySelector('input[data-index="1"]');
  const name = form.querySelector('#name');

  if (name?.getAttribute('value') === '') name.setAttribute('value', 'All');

  if (minPrice && maxPrice) {
    minPrice.setAttribute('name', 'min-price');
    maxPrice.setAttribute('name', 'max-price');
  }
};
