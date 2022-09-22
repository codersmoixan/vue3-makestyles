import flattenCSS from "./flattenCSS";
import stringifyCSS from "./stringifyCSS";
import stylis from "stylis";
import generateClassName from "./generateClassName";
import { isUndefined } from "../helper";
import type * as Styles from "../../types/index.types"

function createClassName({stringCSS, className = '', stylesCreatorOptions}: { stringCSS: string, stylesCreatorOptions: Styles.MakeStylesOptions, className?: string }): string {
  const { classNamePrefix, isHashClassName } = stylesCreatorOptions
  const selector = generateClassName(stringCSS);
  const isInClassName = isUndefined(className)

  if (isHashClassName) {
    return isInClassName ? `${classNamePrefix}-${selector}` : `${classNamePrefix}-${className}__${selector}`;
  }

  return  isUndefined(className)
    ? `${classNamePrefix}-${selector}`
    : `${classNamePrefix}-${className}`;
}

function generateCSS(
  options: Styles.InitialObject,
  stylesCreatorOptions: Styles.MakeStylesOptions,
  className?: string
): Styles.GeneratedCSS {
  const flatCSS = flattenCSS(options, stylesCreatorOptions);
  const stringCSS = stringifyCSS(flatCSS);

  const selectorName = createClassName({ stringCSS, stylesCreatorOptions, className })
  const css = stylis(`.${selectorName}`, stringCSS);

  return {
    css,
    selector: selectorName,
  };
}
export default generateCSS;
