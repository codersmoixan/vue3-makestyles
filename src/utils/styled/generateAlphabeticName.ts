export const charsStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function generateAlphabeticName(code: number): string {
  const lastDigit = charsStr.split("")[code % charsStr.length];
  return code > charsStr.length
    ? `${generateAlphabeticName(Math.floor(code / charsStr.length))}${lastDigit}`
    : lastDigit;
}

export default generateAlphabeticName;
