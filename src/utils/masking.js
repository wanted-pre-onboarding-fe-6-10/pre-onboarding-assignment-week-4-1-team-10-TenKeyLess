export const userNameMasking = function (text) {
  if (text.length > 2) {
    let originName = text.split('');
    originName.forEach(function (_, i) {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    let joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    let pattern = /^./;
    return text.replace(pattern, '*');
  }
};
