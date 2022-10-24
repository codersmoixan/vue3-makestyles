import { objectMerge, isEmpty, isObject, isUndefined } from "../utils/helper";
import deepmerge from "../utils/styled/deepmerge";
import emptyTheme from "../constants/emptyTheme";
import sheet from "./Sheet";
import { makeStylesMeta } from "../constants";
import type * as Styles from "../types/index.types";

interface StylesCreatorInitParams {
  name: string;
  stylesCreator: Styles.StylesOrCreator;
  classNamePrefix: string;
  isHashClassName: boolean;
  isStyled: boolean;
}

class StylesCreator {
  private readonly name: string;
  private readonly options: object;
  private readonly stylesCreator: Styles.StylesOrCreator;

  constructor(options: StylesCreatorInitParams) {
    const { name, stylesCreator } = options

    this.name = name
    this.options = {}
    this.stylesCreator = stylesCreator

    this.init(options)
  }

  public init({ classNamePrefix, name, isHashClassName, isStyled }: StylesCreatorInitParams) {
    this.updateOptions({
      name,
      meta: name || makeStylesMeta,
      isHashClassName,
      classNamePrefix,
      sheet,
      isStyled
    })

    if (process.env.NODE_ENV !== 'production') {
      if (!isObject(this.stylesCreator) && typeof this.stylesCreator !== 'function') {
        console.error(
          [
            'MAKE_STYLES: The `styles` argument provided is invalid.',
            'You need to provide a function generating the styles or a styles object.',
          ].join('\n'),
        );
      }
    }
  }

  public create(theme: Styles.Theme, props: object) {
    let styles;
    try {
      styles = typeof this.stylesCreator === 'function' ? this.stylesCreator(theme, props) : this.stylesCreator
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof this.stylesCreator === 'function' && theme === emptyTheme) {
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

    if (!this.name) {
      return styles
    }

    const themeOverrides = theme.css?.[this.name]

    if (isUndefined(themeOverrides) || isEmpty(themeOverrides)) {
      return styles
    }

    const stylesWithOverrides = objectMerge({}, styles);
    Object.keys(themeOverrides).forEach(key => {
      stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key] || {}, themeOverrides[key]);
    })

    return stylesWithOverrides
  }

  public getOptions(): Styles.StyleCreatorResultOptions {
    return this.options as Styles.StyleCreatorResultOptions
  }

  public updateOptions(options: Styles.StyleCreatorUpdateOptions) {
    objectMerge(this.options, options)
  }
}

export default StylesCreator
