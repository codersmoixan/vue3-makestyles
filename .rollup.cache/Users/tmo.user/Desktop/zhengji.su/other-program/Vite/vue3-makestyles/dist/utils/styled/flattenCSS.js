import { __read, __spreadArray } from "tslib";
import { toLine, isObject, isEmpty, isNumber } from "../helper";
import numericalCSS from "../../constants/numericalCSS";
function flattenCSS(CSSOptions, stylesCreatorOptions) {
    var CSSChunk = [];
    var unit = stylesCreatorOptions.unit, numericalCss = stylesCreatorOptions.numericalCSS;
    for (var key in CSSOptions) {
        if (isEmpty(CSSOptions[key])) {
            continue;
        }
        if (isObject(CSSOptions[key])) {
            CSSChunk.push.apply(CSSChunk, __spreadArray(__spreadArray(["".concat(key, " {")], __read(flattenCSS(CSSOptions[key], stylesCreatorOptions)), false), ["}"], false));
        }
        else if (isNumber(CSSOptions[key])) {
            var CSSNumerical = numericalCss ? __spreadArray([], __read(new Set(__spreadArray(__spreadArray([], __read(numericalCSS), false), __read(numericalCss), false))), false) : numericalCSS;
            if (CSSNumerical.includes(key)) {
                CSSChunk.push("".concat(toLine(key), ": ").concat(CSSOptions[key], ";"));
            }
            else {
                CSSChunk.push("".concat(toLine(key), ": ").concat(CSSOptions[key]).concat(unit, ";"));
            }
        }
        else {
            CSSChunk.push("".concat(toLine(key), ": ").concat(CSSOptions[key], ";"));
        }
    }
    return CSSChunk;
}
export default flattenCSS;
//# sourceMappingURL=flattenCSS.js.map