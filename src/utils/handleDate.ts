const handleDate = (str: string) => {
  const newDate = new Date(str);
  const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
  const date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

  return `${newDate.getFullYear()}년 ${month}월 ${date}일`;
};

export default handleDate;
