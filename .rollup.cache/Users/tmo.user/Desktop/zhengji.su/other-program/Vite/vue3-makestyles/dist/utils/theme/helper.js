export var matchThreshold = {
    xlUp: { query: "up", key: "xl" },
    xlDown: { query: "down", key: "xl" },
    lgUp: { query: "up", key: "lg" },
    lgDown: { query: "down", key: "lg" },
    mdUp: { query: "up", key: "md" },
    mdDown: { query: "down", key: "md" },
    smUp: { query: "up", key: "sm" },
    smDown: { query: "down", key: "sm" },
    xsUp: { query: "up", key: "xs" },
    xsDown: { query: "down", key: "xs" },
};
export var filterKeys = function (keys, propsKeys) {
    return keys.filter(function (i) { return propsKeys.some(function (j) { return j === i; }); });
};
export var formatPropParams = function (keys) {
    var params = {};
    for (var key in keys) {
        params[key] = {
            type: Boolean,
            default: false,
        };
    }
    return params;
};
export var findMatchKey = function (props) {
    var keys = [];
    // Object.keys(props).forEach((item) => {
    //   if (props[item]) {
    //     keys.push(item);
    //   }
    // });
    for (var key in props) {
        if (props[key]) {
            keys.push(key);
        }
    }
    return keys;
};
export var isString = function (value) { return typeof value === "string"; };
export var isFunction = function (value) { return typeof value === "function"; };
export var isUndefined = function (value) {
    return typeof value === "undefined";
};
//# sourceMappingURL=helper.js.map