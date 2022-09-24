export const userNameMasking = text => {
  const nameArr = text.split(' ');

  if (nameArr.length === 2) {
    return `* ${nameArr[nameArr.length - 1]}`;
  }

  if (nameArr.length === 3) {
    return `${nameArr[0]} * ${nameArr[nameArr.length - 1]}`;
  }

  if (nameArr.length === 4) {
    return `${nameArr[0]} * * ${nameArr[nameArr.length - 1]}`;
  }

  return nameArr;
};
