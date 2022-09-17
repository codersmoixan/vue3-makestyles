import { isEmpty, isObject, isUndefined } from "../../utils/helper";
import deepmerge from "../../utils/styled/deepmerge";
import emptyTheme from "../../constants/emptyTheme";
import type { StyleCreatorValue, StyleOrCreator } from "../types/index.types";
import type { Theme } from "../../types/index.types";

export default function getStylesCreator(stylesOrCreator: StyleOrCreator): StyleCreatorValue {
  const themingEnabled = typeof stylesOrCreator === 'function'

  if (process.env.NODE_ENV !== 'production') {
    if (!isObject(stylesOrCreator) && !themingEnabled) {
      console.error(
        [
          'MAKE_STYLES: The `styles` argument provided is invalid.',
          'You need to provide a function generating the styles or a styles object.',
        ].join('\n'),
      );
    }
  }

  return {
    create: (theme: Theme, props: object, name: string) => {
      let styles;
      try {
        styles = themingEnabled ? stylesOrCreator(theme, props) : stylesOrCreator
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          if (themingEnabled && theme === emptyTheme) {
            console.error(
              [
                'MAKE_STYLES: The supplied `theme` argument is invalid. ',
                'The function you provided has no subject in context. ',
                'One of the parent elements needs to use ThemeProvider and provide related theme configuration',
              ].join('\n'),
            );
          }
        }
        throw err;
      }

      if (!name) {
        return styles
      }

      const themeOverrides = theme.css?.[name]

      if (isUndefined(themeOverrides) || isEmpty(themeOverrides)) {
        return styles
      }

      const stylesWithOverrides = Object.assign({}, styles);

      Object.keys(themeOverrides).forEach(key => {
        stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key] || {}, themeOverrides[key]);
      })

      return stylesWithOverrides
    },
    options: {}
  }
}
