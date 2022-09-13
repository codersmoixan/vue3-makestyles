import { __assign, __rest } from "tslib";
import createBreakpoints from "../../constructors/createBreakpoints";
import { isEmpty } from "../helper";
import { isUndefined } from "../helper";
function initTheme(options) {
    if (options === void 0) { options = {}; }
    var _a = options.themeUnit, themeUnit = _a === void 0 ? {
        step: 8,
        unit: "px",
    } : _a, palette = options.palette, _b = options.typography, typography = _b === void 0 ? {} : _b, _c = options.mixins, mixins = _c === void 0 ? {} : _c, _d = options.shape, shape = _d === void 0 ? {} : _d, _e = options.breakpoints, propsBreakpoints = _e === void 0 ? __assign({}, themeUnit) : _e, other = __rest(options, ["themeUnit", "palette", "typography", "mixins", "shape", "breakpoints"]);
    var breakpoints = createBreakpoints(propsBreakpoints);
    var createSpacing = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (isUndefined(themeUnit) || isEmpty(themeUnit))
            return null;
        var complete = arg.map(function (i) { var _a; return "".concat(((_a = themeUnit.step) !== null && _a !== void 0 ? _a : 8) * i).concat(themeUnit.unit); });
        return complete.join(" ");
    };
    return __assign({ spacing: createSpacing, themeUnit: themeUnit, breakpoints: breakpoints, palette: palette, typography: typography, mixins: mixins, shape: shape }, other);
}
export default initTheme;
//# sourceMappingURL=initTheme.js.map