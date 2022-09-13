import { __assign } from "tslib";
export function isPlainObject(item) {
    return item !== null && typeof item === 'object' && item.constructor === Object;
}
export default function deepmerge(target, source, options) {
    if (options === void 0) { options = { clone: true }; }
    var output = options.clone ? __assign({}, target) : target;
    if (isPlainObject(target) && isPlainObject(source)) {
        Object.keys(source).forEach(function (key) {
            if (key === '__proto__') {
                return;
            }
            if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
                output[key] = deepmerge(target[key], source[key], options);
            }
            else {
                output[key] = source[key];
            }
        });
    }
    return output;
}
//# sourceMappingURL=deepmerge.js.map