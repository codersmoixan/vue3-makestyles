import * as Vue from "vue";
import useTheme from "../hooks/useTheme";
import { forOf, isEmpty } from "../utils/helper"
import combinedCSSAndCreateStyleElement from "../utils/styled/combinedCSSAndCreateStyleElement";
import combinedPropsClassNames from "../utils/styled/combinedPropsClassNames";
import deleteCSSAndStyleElement from "../utils/styled/deleteCSSAndStyleElement";
import getStylesCreator from "./getStylesCreator/getStylesCreator";
import emptyTheme from "../constants/emptyTheme";
import type * as Styles from "../types/index.types";

const effectClasses = (options: Styles.EffectOptions, props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
  const { theme, name,  stylesCreator, classNames, styleEleName } = options

  const styles = stylesCreator.create(theme, props, name);

  if (isEmpty(styles)) {
    return;
  }

  const combinedCSS = combinedCSSAndCreateStyleElement(styles);
  const css = combinedCSS.create(stylesCreator.options)
  const combinedClasses = combinedPropsClassNames(
    css.classes,
    props.classes
  );

  styleEleName.value = css.styleEleName;

  forOf(classNames, combinedClasses)
};

function makeStyles(
  stylesOrCreator: Styles.StyleOrCreator,
  options: Styles.MakeStylesOptions = {}
) {
  const {
    name = '',
    classNamePrefix: classNamePrefixOption,
    defaultTheme = emptyTheme,
    isHashClassName = true
  } = options
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const classNamePrefix = classNamePrefixOption || name || 'makeStyles';
  stylesCreator.options = {
    name,
    meta: classNamePrefix,
    classNamePrefix,
    isHashClassName
  }

  const useStyles = (props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
    const theme = useTheme() || defaultTheme;
    stylesCreator.options.unit = theme.themeUnit?.unit ?? 'px'
    stylesCreator.options.numericalCSS = theme.numericalCSS

    const styleEleName = Vue.ref<string | null>("");
    const classNames = Vue.reactive<Styles.InitialObject>({});

    Vue.watchEffect(() => {
      const current = {
        name,
        classNamePrefix,
        theme,
        stylesCreator,
        classNames,
        styleEleName
      }

      effectClasses(current, props);
    });

    Vue.onUnmounted(() => {
      const combinedClassNamesValue = Object.values(classNames);
      deleteCSSAndStyleElement(
        `.${combinedClassNamesValue?.[0]}`,
        styleEleName.value
      );
    });

    return classNames;
  };

  return useStyles
}

export default makeStyles;
