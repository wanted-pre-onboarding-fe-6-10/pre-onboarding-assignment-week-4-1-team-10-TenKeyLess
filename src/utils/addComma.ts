const addComma = (num: string) => {
  const number = Math.floor(parseInt(num));
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export default addComma;
