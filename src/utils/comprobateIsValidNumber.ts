export function comprobateValidNumber(number: string, base: string): boolean {

  if (number === "") return true

  const validNumbers: { [key: string]: RegExp } = {
    "2": /^-?[01]+$/,
    "8": /^-?[0-7]+$/,
    "10": /^-?[0-9]+$/,
    "16": /^-?[0-9A-Fa-f]+$/
  }

  const matchResult = number.match(validNumbers[base]);
  return matchResult !== null;

}