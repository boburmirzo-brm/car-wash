export const checkErrorMessage = (error: any) => {
  return typeof error === "string" ? error : error[0];
};

export const toNumber = (n: string | number | undefined) => {
  if (!n) return 0;
  return typeof n === "number" ? n : Number(n?.split(" ").join(""));
};

export function fromToTime(time: string, day: number = 0) {
  if(!time) return {from:"", to: ""}
  const toDate = new Date(time);
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - day);

  return {
    from: fromDate.toISOString().slice(0, 10),
    to: toDate.toISOString().slice(0, 10),
  };
}
