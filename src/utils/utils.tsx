export const makeComma = (number: string) => {
  return Math.ceil(parseInt(number))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const maskingAccountNumber = (number: string) => {
  let originNumber = number.split('');
  originNumber.forEach((n, i) => {
    if (i === 0 || i === originNumber.length - 1) return;
    originNumber[i] = '*';
  });
  return originNumber;
};

export const maskingPhoneNumber = (number: string) => {
  let originNumber = number.split('');
  originNumber.forEach((n, i) => {
    let tmp = 6;
    if (number.slice(0, 3).includes('010')) tmp = 7;
    if (i < 4 || i > tmp) return;
    originNumber[i] = '*';
  });
  return originNumber;
};

export const getKeyByValue = (object: any, value: string) => {
  return Object.keys(object).find(key => object[key] === value);
};
