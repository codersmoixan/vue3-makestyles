import { filterKeys, findMatchKey, matchThreshold, } from "../utils/theme/helper";
import useMediaQuery from "./useMediaQuery";
import { isUndefined } from "../utils/helper";
import { ref } from "vue";
var useVisible = function (props) {
    var _a;
    var isHide = ref(true);
    var matchKeys = (_a = filterKeys(Object.keys(matchThreshold), findMatchKey(props))) === null || _a === void 0 ? void 0 : _a[0];
    var match = matchThreshold[matchKeys];
    if (isUndefined(match)) {
        return isHide;
    }
    return useMediaQuery(function (theme) {
        return theme.breakpoints[match.query](match.key);
    });
};
export default useVisible;
//# sourceMappingURL=useVisible.js.map