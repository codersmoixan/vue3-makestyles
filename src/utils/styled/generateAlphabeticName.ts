const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function generateAlphabeticName(code: number): string {
  const lastDigit = chars[code % chars.length];
  return code > chars.length
    ? `${generateAlphabeticName(Math.floor(code / chars.length))}${lastDigit}`
    : lastDigit;
}

export default generateAlphabeticName;
