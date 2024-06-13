export const getTodayInit = (h = 0, m = 0, s = 0) => {
  const temp = new Date();
  const date = temp.getDate();
  const month = temp.getMonth();
  const year = temp.getFullYear();
  const initDate = new Date(year, month, date, h, m, s);
  return initDate;
};
