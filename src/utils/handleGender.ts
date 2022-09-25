export const handleGender = (gender: number) => {
  if (gender === 1 || gender === 3) {
    return '남';
  } else {
    return '여';
  }
};
