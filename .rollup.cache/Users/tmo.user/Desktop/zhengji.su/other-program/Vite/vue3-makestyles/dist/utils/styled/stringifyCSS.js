import { __read, __spreadArray } from "tslib";
function stringifyCSS(flatCSS) {
    return flatCSS
        .reduce(function (rules, item) {
        return __spreadArray(__spreadArray([], __read(rules), false), [item], false);
    }, [])
        .join(" ")
        .replace(/^\s*\/\/.*$/gm, "");
}
export default stringifyCSS;
//# sourceMappingURL=stringifyCSS.js.map