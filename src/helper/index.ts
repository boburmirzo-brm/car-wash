export const checkErrorMessage = (error: any) => {
  return typeof error === "string" ? error : error[0];
};

export const toNumber = (n: string | number | undefined) => {
  if (typeof n === "string") {
    return Number(n?.replace(/\s/g, ""));
  }
  return Number(n) || 0;
  // if (!n) return 0;
  // return typeof n === "number" ? n : Number(n?.split(" ").join(""));
};

export function fromToTime(time: string, day: number = 0) {
  const [datePart] = time.split(" ");
  const date = new Date(datePart);
  date.setDate(date.getDate() - day);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const from = `${yyyy}-${mm}-${dd}`;
  const to = `${datePart}`;
  return { from, to };
}
