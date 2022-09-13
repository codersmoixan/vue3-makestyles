import { onUnmounted, reactive, ref, watchEffect, } from "vue";
import useTheme from "../hooks/useTheme";
import { isEmpty } from "../utils/helper";
import combineCSSAndCreateStyleElement from "../utils/styled/combineCSSAndCreateStyleElement";
import combinePropsClassNames from "../utils/styled/combinePropsClassNames";
import deleteCSSAndStyleElement from "../utils/styled/deleteCSSAndStyleElement";
import getStylesCreator from "./getStylesCreator/getStylesCreator";
import emptyTheme from "../constants/emptyTheme";
var effectClasses = function (options, props) {
    if (props === void 0) { props = {}; }
    var theme = options.theme, name = options.name, stylesCreator = options.stylesCreator, classNames = options.classNames, styleEleName = options.styleEleName;
    var styles = stylesCreator.create(theme, props, name);
    if (isEmpty(styles)) {
        return;
    }
    var combineCSS = combineCSSAndCreateStyleElement(styles);
    var css = combineCSS.create(stylesCreator.options);
    var combineClasses = combinePropsClassNames(css.classes, props.classes);
    styleEleName.value = css.styleEleName;
    for (var key in combineClasses) {
        classNames[key] = combineClasses[key];
    }
};
function makeStyles(stylesOrCreator, options) {
    if (options === void 0) { options = {}; }
    var _a = options.componentName, componentName = _a === void 0 ? '' : _a, classNamePrefixOption = options.classNamePrefix, _b = options.defaultTheme, defaultTheme = _b === void 0 ? emptyTheme : _b;
    var stylesCreator = getStylesCreator(stylesOrCreator);
    var classNamePrefix = classNamePrefixOption || componentName || 'makeStyles';
    stylesCreator.options = {
        name: componentName,
        meta: classNamePrefix,
        classNamePrefix: classNamePrefix,
    };
    var useStyles = function (props) {
        var _a, _b;
        if (props === void 0) { props = {}; }
        var theme = useTheme() || defaultTheme;
        stylesCreator.options.unit = (_b = (_a = theme.themeUnit) === null || _a === void 0 ? void 0 : _a.unit) !== null && _b !== void 0 ? _b : 'px';
        stylesCreator.options.numericalCSS = theme.numericalCSS;
        var styleEleName = ref("");
        var classNames = reactive({});
        watchEffect(function () {
            var current = {
                name: componentName,
                classNamePrefix: classNamePrefix,
                theme: theme,
                stylesCreator: stylesCreator,
                classNames: classNames,
                styleEleName: styleEleName
            };
            effectClasses(current, props);
        });
        onUnmounted(function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            var combineClassNamesValue = Object.values(classNames);
            deleteCSSAndStyleElement(".".concat(combineClassNamesValue === null || combineClassNamesValue === void 0 ? void 0 : combineClassNamesValue[0]), styleEleName.value);
        });
        return classNames;
    };
    return useStyles;
}
export default makeStyles;
//# sourceMappingURL=makeStyles.js.map