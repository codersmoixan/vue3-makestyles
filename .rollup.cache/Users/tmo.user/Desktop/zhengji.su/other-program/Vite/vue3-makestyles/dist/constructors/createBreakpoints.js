function createBreakpoints(breakpoints) {
    if (breakpoints === void 0) { breakpoints = {}; }
    var _a = breakpoints.values, values = _a === void 0 ? {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1680,
    } : _a, _b = breakpoints.unit, unit = _b === void 0 ? "px" : _b, _c = breakpoints.step, step = _c === void 0 ? 5 : _c;
    var keys = Object.keys(values);
    var up = function (key, get) {
        var value = values[key];
        var query = "@media (min-width:".concat(value).concat(unit, ")");
        if (!get)
            return query;
        if (get)
            return { query: query, value: value, get: get, status: "up" };
    };
    var down = function (key, get) {
        var _a;
        var value = (_a = values[key]) !== null && _a !== void 0 ? _a : 0;
        var query = "@media (max-width:".concat(value - step / 100).concat(unit, ")");
        if (!get)
            return query;
        if (get)
            return { query: query, value: value, get: get, status: "down" };
    };
    var between = function (start, end, get) {
        var _a, _b;
        var endIndex = keys.indexOf(end);
        var mat = keys[endIndex];
        var startMedia = values[start];
        var startValue = (_a = values[mat]) !== null && _a !== void 0 ? _a : 0;
        var endValue = (_b = values[end]) !== null && _b !== void 0 ? _b : 0;
        var endMedia = (endIndex !== -1 ? startValue : endValue) - step / 100;
        var query = "@media (min-width:".concat(startMedia).concat(unit, ") and ") +
            "(max-width:".concat(endMedia).concat(unit, ")");
        if (!get)
            return query;
        if (get)
            return {
                query: query,
                get: get,
                value: [startMedia, endMedia],
                status: "between",
            };
    };
    return {
        values: values,
        keys: keys,
        unit: unit,
        step: step,
        up: up,
        down: down,
        between: between,
    };
}
export default createBreakpoints;
//# sourceMappingURL=createBreakpoints.js.map