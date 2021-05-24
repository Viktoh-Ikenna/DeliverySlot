export function date(index) {
  const dt = new Date();
  let set = dt.getDate() + index;
  dt.setDate(set);
  return `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
}
