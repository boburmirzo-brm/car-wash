interface String {
  plateNumberFormat(): string;
  telFormat():string
}

String.prototype.plateNumberFormat = function () {
  return this.replace(/(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])/g, ' ').toUpperCase()
};

String.prototype.telFormat = function () {
    return this.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
}