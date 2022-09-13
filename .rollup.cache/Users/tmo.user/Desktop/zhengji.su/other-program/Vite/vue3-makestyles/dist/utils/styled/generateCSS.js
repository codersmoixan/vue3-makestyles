import flattenCSS from "./flattenCSS";
import stringifyCSS from "./stringifyCSS";
import stylis from "stylis";
import generateClassName from "./generateClassName";
import { isUndefined } from "../helper";
function generateCSS(options, stylesCreatorOptions, className) {
    var classNamePrefix = stylesCreatorOptions.classNamePrefix;
    var flatCSS = flattenCSS(options, stylesCreatorOptions);
    var stringCSS = stringifyCSS(flatCSS);
    var selector = generateClassName(stringCSS);
    var selectorName = isUndefined(className)
        ? "".concat(classNamePrefix, "-").concat(selector)
        : "".concat(classNamePrefix, "-").concat(className, "__").concat(selector);
    var css = stylis(".".concat(selectorName), stringCSS);
    return {
        css: css,
        selector: selectorName,
    };
}
export default generateCSS;
//# sourceMappingURL=generateCSS.js.map