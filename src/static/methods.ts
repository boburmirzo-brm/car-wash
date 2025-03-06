interface String {
  plateNumberFormat(): string;
  telFormat(): string;
  dateFormat(): string;
  timeFormat(): string;
}

String.prototype.plateNumberFormat = function () {
  return this.replace(
    /(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])/g,
    " "
  ).toUpperCase();
};

String.prototype.telFormat = function () {
  return this.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
};

String.prototype.dateFormat = function () {
  const months: string[] = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const dateObj = new Date(String(this));
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day}-${month}. ${year}`;
};

String.prototype.timeFormat = function () {
  const dateObj = new Date(String(this));
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};
