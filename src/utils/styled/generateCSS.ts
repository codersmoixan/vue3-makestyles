import flattenCSS from "./flattenCSS";
import stringifyCSS from "./stringifyCSS";
import stylis from "stylis";
import generateClassName from "./generateClassName";
import { isUndefined } from "../helper";
import type * as Styles from "../../types/index.types"

function generateCSS(
  options: Styles.InitialObject,
  stylesCreatorOptions: Styles.InitialObject,
  className?: string
): Styles.GeneratedCSS {
  const { classNamePrefix } = stylesCreatorOptions

  const flatCSS = flattenCSS(options, stylesCreatorOptions);

  const stringCSS = stringifyCSS(flatCSS);
  const selector = generateClassName(stringCSS);

  const selectorName = isUndefined(className)
    ? `${classNamePrefix}-${selector}`
    : `${classNamePrefix}-${className}__${selector}`;

  const css = stylis(`.${selectorName}`, stringCSS);

  return {
    css,
    selector: selectorName,
  };
}
export default generateCSS;
