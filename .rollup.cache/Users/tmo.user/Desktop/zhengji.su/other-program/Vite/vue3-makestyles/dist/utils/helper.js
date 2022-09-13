export var toLine = function (name) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
};
export var isObject = function (value) {
    var type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
};
export var isFunction = function (value) { return typeof value === 'function'; };
export var isUndefined = function (value) { return typeof value === 'undefined'; };
export var isNull = function (value) { return value === null; };
export var isArray = function (value) { return Array.isArray(value); };
export var isEmpty = function (value) {
    if (isNull(value) || isUndefined(value)) {
        return true;
    }
    if (isArray(value)) {
        return value.length === 0;
    }
    return isObject(value) && !Object.keys(value).length;
};
export var isString = function (value) { return typeof value === 'string'; };
export var isNumber = function (value) { return typeof value === 'number'; };
//# sourceMappingURL=helper.js.map