var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function generateAlphabeticName(code) {
    var lastDigit = chars[code % chars.length];
    return code > chars.length
        ? "".concat(generateAlphabeticName(Math.floor(code / chars.length))).concat(lastDigit)
        : lastDigit;
}
export default generateAlphabeticName;
//# sourceMappingURL=generateAlphabeticName.js.map