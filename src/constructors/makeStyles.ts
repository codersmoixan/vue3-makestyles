import * as Vue from "vue";
import useTheme from "../hooks/useTheme";
import { forOf, isEmpty } from "../utils/helper"
import CSS from "../models/CSS";
import combinedPropsClassNames from "../utils/styled/combinedPropsClassNames";
import emptyTheme from "../constants/emptyTheme";
import { tagName } from "../constants"
import type * as Styles from "../types/index.types";
import StylesCreator from "../models/StylesCreator";

interface EffectOptions {
  theme: Styles.Theme;
  stylesCreator: StylesCreator;
  classNames: Styles.InitialObject;
  css: CSS
}

const effectClasses = (options: EffectOptions, props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
  const { theme, stylesCreator, classNames, css: cssCreator } = options

  const styles = stylesCreator.create(theme, props);
  stylesCreator.updateOptions({
    styles,
    styleKeys: Object.keys(styles)
  })

  if (isEmpty(styles)) {
    return;
  }

  const css = cssCreator.init(stylesCreator.getOptions());
  const classes = css.create(styles)

  const combinedClasses = combinedPropsClassNames(
    classes,
    props.classes
  );

  forOf(classNames, combinedClasses)
};

function makeStyles(
  stylesOrCreator: Styles.StylesOrCreator,
  options: Styles.MakeStylesOptions = {}
) {
  const {
    name = '',
    classNamePrefix: classNamePrefixOption,
    defaultTheme = emptyTheme,
    isHashClassName = true,
    isStyled = false
  } = options
  const classNamePrefix = name || classNamePrefixOption || tagName;
  const creatorParams = {
    name,
    classNamePrefix,
    isHashClassName,
    stylesCreator: stylesOrCreator,
    isStyled
  }
  const stylesCreator = new StylesCreator(creatorParams);
  const css = new CSS(stylesCreator.getOptions())

  const useStyles = (props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
    const theme = useTheme() || defaultTheme;
    stylesCreator.updateOptions({
      unit: theme.themeUnit?.unit ?? 'px',
      numericalCSS: theme.numericalCSS
    })

    const classNames = Vue.reactive<Styles.InitialObject>({});

    Vue.watchEffect(() => {
      const current = {
        theme,
        stylesCreator,
        css,
        classNames,
      }

      effectClasses(current, props);
    });

    return classNames;
  };

  return useStyles
}

export default makeStyles;
