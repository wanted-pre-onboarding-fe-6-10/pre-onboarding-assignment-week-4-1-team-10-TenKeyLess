import React from 'react';

const MakeFilterData = obj => {
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

export default MakeFilterData;
