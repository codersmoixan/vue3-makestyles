import { isEmpty, isFunction, isObject, isUndefined } from "../../utils/helper";
import deepmerge from "../../utils/styled/deepmerge";
import emptyTheme from "../../constants/emptyTheme";
export default function getStylesCreator(stylesOrCreator) {
    var themingEnabled = isFunction(stylesOrCreator);
    if (process.env.NODE_ENV !== 'production') {
        if (!isObject(stylesOrCreator) && !themingEnabled) {
            console.error([
                'MAKE_STYLES: The `styles` argument provided is invalid.',
                'You need to provide a function generating the styles or a styles object.',
            ].join('\n'));
        }
    }
    return {
        create: function (theme, props, name) {
            var _a;
            var styles;
            try {
                styles = themingEnabled ? stylesOrCreator(theme, props) : stylesOrCreator;
            }
            catch (err) {
                if (process.env.NODE_ENV !== 'production') {
                    if (themingEnabled && theme === emptyTheme) {
                        console.error([
                            'MAKE_STYLES: The supplied `theme` argument is invalid. ',
                            'The function you provided has no subject in context. ',
                            'One of the parent elements needs to use ThemeProvider and provide related theme configuration',
                        ].join('\n'));
                    }
                }
                throw err;
            }
            if (!name) {
                return styles;
            }
            var themeOverrides = (_a = theme.css) === null || _a === void 0 ? void 0 : _a[name];
            if (isUndefined(themeOverrides) || isEmpty(themeOverrides)) {
                return styles;
            }
            var stylesWithOverrides = Object.assign({}, styles);
            Object.keys(themeOverrides).forEach(function (key) {
                stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key] || {}, themeOverrides[key]);
            });
            return stylesWithOverrides;
        },
        options: {}
    };
}
//# sourceMappingURL=getStylesCreator.js.map