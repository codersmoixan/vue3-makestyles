import { ref } from "vue";
import useTheme from "./useTheme";
import generateThemeTypographyCSS from "../utils/styled/generateThemeTypographyCSS";
var useGenerateTypographyCSS = function (options) {
    if (options === void 0) { options = {}; }
    var theme = useTheme();
    var className = ref("");
    var name = options.name, classNamePrefixOption = options.classNamePrefix;
    var classNamePrefix = name || classNamePrefixOption || 'makeStyles';
    var initThemeCSS = function (variant) {
        var current = {
            classNamePrefix: classNamePrefix,
            theme: theme,
            variant: variant
        };
        var themeClass = generateThemeTypographyCSS(current);
        if (themeClass) {
            className.value = themeClass;
        }
    };
    return {
        className: className,
        initThemeCSS: initThemeCSS,
    };
};
export default useGenerateTypographyCSS;
//# sourceMappingURL=useGenerateTypographyCSS.js.map