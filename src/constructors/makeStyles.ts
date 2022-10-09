import * as Vue from "vue";
import useTheme from "../hooks/useTheme";
import { forOf, isEmpty } from "../utils/helper"
import combinedCSSAndCreateStyleElement from "../utils/styled/combinedCSSAndCreateStyleElement";
import combinedPropsClassNames from "../utils/styled/combinedPropsClassNames";
import deleteCSSAndStyleElement from "../utils/styled/deleteCSSAndStyleElement";
import getStylesCreator from "./getStylesCreator/getStylesCreator";
import emptyTheme from "../constants/emptyTheme";
import { tagName } from "../constants"
import sheet from "../model/sheet";
import type * as Styles from "../types/index.types";

const effectClasses = (options: Styles.MakeStylesEffectOptions, props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
  const { theme, name,  stylesCreator, classNames, styleEleName } = options

  const styles = stylesCreator.create(theme, props, name);
  stylesCreator.options.styles = styles
  stylesCreator.options.styleKeys = Object.keys(styles)

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
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const classNamePrefix = classNamePrefixOption || name || tagName;
  stylesCreator.options = {
    name,
    meta: classNamePrefix,
    classNamePrefix,
    isHashClassName: isHashClassName ?? !name,
    tag: tagName,
    sheet,
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
