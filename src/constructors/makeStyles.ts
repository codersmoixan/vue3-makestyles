import * as Vue from "vue";
import useTheme from "../hooks/useTheme";
import { forOf, isEmpty } from "../utils/helper"
import CSS from "../models/CSS";
import combinedPropsClassNames from "../utils/styled/combinedPropsClassNames";
import emptyTheme from "../constants/emptyTheme";
import { tagName } from "../constants"
import sheet from "../models/Sheet";
import type * as Styles from "../types/index.types";
import StylesCreator from "../models/StylesCreator";

interface EffectOptions {
  theme: Styles.Theme;
  stylesCreator: StylesCreator;
  classNames: Styles.InitialObject;
  css: CSS
}

const effectClasses = (options: EffectOptions, props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
  const { theme, stylesCreator, classNames, css } = options

  const styles = stylesCreator.create(theme, props);
  stylesCreator.updateOptions({
    styles,
    styleKeys: Object.keys(styles)
  })

  if (isEmpty(styles)) {
    return;
  }

  const combinedCSS = css.init(stylesCreator.getOptions());
  const classes = combinedCSS.create(styles)

  const combinedClasses = combinedPropsClassNames(
    classes,
    props.classes
  );

  forOf(classNames, combinedClasses)
};

function makeStyles<
  Theme = Styles.Theme,
  Props extends object = {},
  ClassKey extends string = string
>(
  stylesOrCreator: Styles.StylesOrCreator,
  options: Styles.MakeStylesOptions = {}
) {
  const {
    name = '',
    classNamePrefix: classNamePrefixOption,
    defaultTheme = emptyTheme,
    isHashClassName
  } = options
  const stylesCreator = new StylesCreator({
    name,
    stylesCreator: stylesOrCreator
  });

  const classNamePrefix = classNamePrefixOption || name || tagName;
  stylesCreator.updateOptions({
    name,
    meta: classNamePrefix,
    classNamePrefix,
    isHashClassName: isHashClassName ?? !name,
    tag: tagName,
    sheet
  })

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
