import { isUndefined } from "../helper";
import generateCSS from "./generateCSS";
import generateStyleElement from "./generateStyleElement";
import generateStyleElementID from "./generateStyleElementID";
function generateThemeCSS(options) {
    var _a, _b;
    var variant = options.variant, theme = options.theme, element = options.element, classNamePrefix = options.classNamePrefix;
    if (isUndefined(variant))
        return null;
    var variantThemeOptions = (_a = theme.css) === null || _a === void 0 ? void 0 : _a[variant];
    if (isUndefined(variantThemeOptions)) {
        console.error('A valid "variant" value needs to be passed in, which belongs to the valid values defined in "css" in "theme.ts/.js"');
        return null;
    }
    var _c = generateCSS(variantThemeOptions, {
        unit: (_b = theme.themeUnit) === null || _b === void 0 ? void 0 : _b.unit,
        classNamePrefix: classNamePrefix
    }), css = _c.css, selector = _c.selector;
    var eleName = generateStyleElementID(css);
    generateStyleElement(css, eleName, selector, element);
    return selector;
}
export default generateThemeCSS;
//# sourceMappingURL=generateThemeCSS.js.map