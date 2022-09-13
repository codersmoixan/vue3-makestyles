import createBreakpoints from "../constructors/createBreakpoints";
import { inject } from "vue";
import { isEmpty } from "../utils/helper";
var useTheme = function () {
    var theme = inject("theme");
    return isEmpty(theme)
        ? {
            breakpoints: createBreakpoints(),
        }
        : theme;
};
export default useTheme;
//# sourceMappingURL=useTheme.js.map