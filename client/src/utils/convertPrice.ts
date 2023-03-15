export const convertPrice = (price: number) =>
  price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
