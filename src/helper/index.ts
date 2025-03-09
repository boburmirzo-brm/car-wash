export const checkErrorMessage = (error: any) => {
  return typeof error === "string" ? error : error[0];
};

export const toNumber = (n: string | number | undefined) => {
  if(!n) return 0 
  return typeof n === "number" ? n : Number(n?.split(" ").join(""));
};
