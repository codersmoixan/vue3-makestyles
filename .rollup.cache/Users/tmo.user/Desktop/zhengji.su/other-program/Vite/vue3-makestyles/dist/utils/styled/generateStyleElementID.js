import generateClassName from "./generateClassName";
function generateStyleElementID(stringifyCSS) {
    var styleElementIDName = generateClassName(stringifyCSS);
    return "makeStyleElement__".concat(styleElementIDName);
}
export default generateStyleElementID;
//# sourceMappingURL=generateStyleElementID.js.map