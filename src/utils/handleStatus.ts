export const handleStatus = (status: number) => {
  switch (status) {
    case 1:
      return '입금대기';
      break;
    case 2:
      return '운용중';
      break;
    case 3:
      return '투자중지';
      break;
    case 4:
      return '해지';
      break;
    case 9999:
      return '관리자확인필요';
      break;
  }
};
