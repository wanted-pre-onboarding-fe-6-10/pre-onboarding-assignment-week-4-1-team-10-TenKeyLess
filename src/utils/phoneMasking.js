function phoneMasking(str) {
  let result = '';

  if (/-[0-9]{4}-/.test(str)) {
    result = str.toString().replace(str, str.toString().replace(/-[0-9]{4}-/g, '-****-'));
  }
  return result;
}

export default phoneMasking;
