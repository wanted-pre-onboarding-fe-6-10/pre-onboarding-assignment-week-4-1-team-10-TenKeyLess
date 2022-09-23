export const makeComma = (number: string) => {
  return Math.ceil(parseInt(number))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const masking = (number: string) => {
  let originNumber = number.split('');
  originNumber.forEach((n, i) => {
    if (i === 0 || i === originNumber.length - 1) return;
    originNumber[i] = '*';
  });
  return originNumber;
};
