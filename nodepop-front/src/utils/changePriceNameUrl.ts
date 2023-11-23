export const changePriceNameUrl = (
  formRef?: React.RefObject<HTMLFormElement>
) => {
  const nameInput = formRef?.current?.productName;
  const priceInputs = formRef?.current?.price as NodeListOf<HTMLInputElement>;

  const minPrice = Array.from(priceInputs).at(0);
  const maxPrice = Array.from(priceInputs).at(1);

  if (nameInput)
    nameInput.value = nameInput?.value === '' ? 'all' : nameInput?.value;

  if (minPrice && maxPrice) {
    minPrice.setAttribute('name', 'min-price');
    maxPrice.setAttribute('name', 'max-price');
  }
};
