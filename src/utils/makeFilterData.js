const makeFilterData = obj => {
  const filterData = Object.entries(obj).map(data => {
    return {
      text: data[1],
      value: data[0],
    };
  });
  filterData.unshift({
    text: '----- 선택하세요 -----',
    value: '',
  });

  return filterData;
};

export default makeFilterData;
