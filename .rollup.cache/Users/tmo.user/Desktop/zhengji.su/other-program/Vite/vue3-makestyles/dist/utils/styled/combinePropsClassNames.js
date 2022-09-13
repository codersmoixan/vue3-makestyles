import { isEmpty } from "../helper";
function combinePropsClassNames(makeClassNames, propsClassNames) {
    if (propsClassNames === void 0) { propsClassNames = {}; }
    if (isEmpty(propsClassNames)) {
        return makeClassNames;
    }
    var combineClassNames = Object.assign({}, makeClassNames);
    for (var key in propsClassNames) {
        if (combineClassNames[key]) {
            combineClassNames[key] = combineClassNames[key] += " ".concat(propsClassNames[key]);
        }
    }
    return combineClassNames;
}
export default combinePropsClassNames;
//# sourceMappingURL=combinePropsClassNames.js.map