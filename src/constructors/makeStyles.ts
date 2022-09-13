import {
  onUnmounted,
  reactive,
  ref,
  watchEffect,
} from "vue";
import useTheme from "../hooks/useTheme";
import { isEmpty } from "../utils/helper"
import combineCSSAndCreateStyleElement from "../utils/styled/combineCSSAndCreateStyleElement";
import combinePropsClassNames from "../utils/styled/combinePropsClassNames";
import deleteCSSAndStyleElement from "../utils/styled/deleteCSSAndStyleElement";
import getStylesCreator from "./getStylesCreator/getStylesCreator";
import emptyTheme from "../constants/emptyTheme";
import type { ObjectType } from "../types/index.types";
import type { MakeStylesOptions, StyleOrCreator } from "./types/index.types"
import type { EffectOptions } from "./types/index.types";

const effectClasses = (options: EffectOptions, props: ObjectType = {}) => {
  const { theme, name,  stylesCreator, classNames, styleEleName } = options

  const styles = stylesCreator.create(theme, props, name);

  if (isEmpty(styles)) {
    return;
  }

  const combineCSS = combineCSSAndCreateStyleElement(styles);
  const css = combineCSS.create(stylesCreator.options)
  const combineClasses = combinePropsClassNames(
    css.classes,
    props.classes
  );

  styleEleName.value = css.styleEleName;

  for (const key in combineClasses) {
    classNames[key] = combineClasses[key];
  }
};

function makeStyles(
  stylesOrCreator: StyleOrCreator,
  options: MakeStylesOptions = {}
) {
  const {
    componentName = '',
    classNamePrefix: classNamePrefixOption,
    defaultTheme = emptyTheme
  } = options
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const classNamePrefix = classNamePrefixOption || componentName || 'makeStyles';
  stylesCreator.options = {
    name: componentName,
    meta: classNamePrefix,
    classNamePrefix,
  }

  const useStyles = (props: object = {}) => {
    const theme = useTheme() || defaultTheme;
    stylesCreator.options.unit = theme.themeUnit?.unit ?? 'px'
    stylesCreator.options.numericalCSS = theme.numericalCSS

    const styleEleName = ref<string | null>("");
    const classNames = reactive<ObjectType>({});

    watchEffect(() => {
      const current = {
        name: componentName,
        classNamePrefix,
        theme,
        stylesCreator,
        classNames,
        styleEleName
      }

      effectClasses(current, props);
    });

    onUnmounted(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const combineClassNamesValue = Object.values(classNames);
      deleteCSSAndStyleElement(
        `.${combineClassNamesValue?.[0]}`,
        styleEleName.value
      );
    });

    return classNames;
  };

  return useStyles
}

export default makeStyles;
