import { onMounted, ref, onUnmounted } from "vue";
import useTheme from "./useTheme";
import { isUndefined } from "../utils/helper";
import { isFunction } from "../utils/helper";
import { isString } from "../utils/helper";
var useMediaQuery = function (queryInput) {
    var supportMatchMedia = window && !isUndefined(window.matchMedia);
    var matchMedia = supportMatchMedia ? window.matchMedia : null;
    var theme = useTheme();
    var mediaMatch = isFunction(queryInput) ? queryInput(theme) : queryInput;
    var query = isString(mediaMatch) ? mediaMatch : mediaMatch.query;
    query = query.replace(/^@media( ?)/m, "");
    var match = ref(false);
    var active = ref(true);
    if (!matchMedia) {
        match.value = false;
        return match;
    }
    var queryList = matchMedia === null || matchMedia === void 0 ? void 0 : matchMedia(query);
    var updateMatch = function () {
        if (!active.value)
            return false;
        match.value = queryList.matches;
    };
    onMounted(function () {
        active.value = true;
        if (!supportMatchMedia)
            return;
        updateMatch();
        queryList.addEventListener("change", updateMatch);
    });
    onUnmounted(function () {
        active.value = false;
        queryList.removeEventListener("change", updateMatch);
    });
    return match;
};
export default useMediaQuery;
//# sourceMappingURL=useMediaQuery.js.map