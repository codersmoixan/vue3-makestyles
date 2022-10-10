import * as Vue from "vue";
import useTheme from "../hooks/useTheme";
import { forOf, isEmpty } from "../utils/helper"
import CSS from "../models/css";
import combinedPropsClassNames from "../utils/styled/combinedPropsClassNames";
import getStylesCreator from "./getStylesCreator/getStylesCreator";
import emptyTheme from "../constants/emptyTheme";
import { tagName } from "../constants"
import sheet from "../models/sheet";
import generateHashName from "../utils/styled/generateHashName";
import type * as Styles from "../types/index.types";

const effectClasses = (options: Styles.MakeStylesEffectOptions, props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
  const { theme, stylesCreator, classNames, css } = options
  const { name, id, inserted: optionsInserted } = stylesCreator.options

  const styles = stylesCreator.create(theme, props, name);
  stylesCreator.options.styles = styles
  stylesCreator.options.styleKeys = Object.keys(styles)

  if (isEmpty(styles)) {
    return;
  }

  const combinedCSS = css.init(stylesCreator.options);
  const classes = combinedCSS.create(styles)
  const inserted = optionsInserted?.[id]

  if (isEmpty(classes) && !isEmpty(inserted)) {
    forOf(classNames, inserted)
    return
  }

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
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const classNamePrefix = classNamePrefixOption || name || tagName;
  stylesCreator.options = {
    ...stylesCreator.options,
    id: classNamePrefix === tagName ? `${classNamePrefix}_${generateHashName()}` : classNamePrefix,
    name,
    meta: classNamePrefix,
    classNamePrefix,
    isHashClassName: isHashClassName ?? !name,
    tag: tagName,
    sheet,
  }

  const css = new CSS(stylesCreator.options)

  const useStyles = (props: Vue.ExtractPropTypes<Styles.InitialObject> = {}) => {
    const theme = useTheme() || defaultTheme;
    stylesCreator.options.unit = theme.themeUnit?.unit ?? 'px'
    stylesCreator.options.numericalCSS = theme.numericalCSS

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
