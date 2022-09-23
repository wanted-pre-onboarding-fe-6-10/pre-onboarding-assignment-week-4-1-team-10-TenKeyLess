function addComma(str) {
  let regexp = /\B(?=(\d{3})+(?!\d))/g;
  return str.toString().replace(regexp, ',');
}

export default addComma;
