import generateCSS from "./generateCSS";
import generateStyleElement from "./generateStyleElement";
import generateClassName from "./generateClassName";
import { isEmpty } from "../helper";
function combineCSSAndCreateStyleElement(styles) {
    return {
        create: function (stylesCreatorOptions) {
            var _a;
            var classes = {};
            var stringifyCSS = "";
            for (var key in styles) {
                if (isEmpty(styles[key])) {
                    continue;
                }
                var _b = generateCSS(styles[key], stylesCreatorOptions, key), selector = _b.selector, css = _b.css;
                classes[key] = selector;
                stringifyCSS += css;
            }
            var styleElementIDName = generateClassName(stringifyCSS);
            var eleDataMeta = "".concat((_a = stylesCreatorOptions.meta) !== null && _a !== void 0 ? _a : 'makeStyleElement', "__").concat(styleElementIDName);
            var styleEleName = generateStyleElement(stringifyCSS, eleDataMeta);
            return {
                classes: classes,
                styleEleName: styleEleName,
            };
        }
    };
}
export default combineCSSAndCreateStyleElement;
//# sourceMappingURL=combineCSSAndCreateStyleElement.js.map