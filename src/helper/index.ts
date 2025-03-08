export const checkErrorMessage = (error: any) => {
  return typeof error === "string" ? error : error[0];
};
