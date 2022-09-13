import flattenCSS from "./flattenCSS";
import stringifyCSS from "./stringifyCSS";
import stylis from "stylis";
import generateClassName from "./generateClassName";
import {isUndefined} from "../helper";
import type { ObjectType } from "../../types/index.types";
import type { GeneratedCSS } from "../../types/generateCSS.type";

function generateCSS<T = ObjectType>(
  options: T,
  stylesCreatorOptions: ObjectType,
  className?: string
): GeneratedCSS {
  const { classNamePrefix } = stylesCreatorOptions

  const flatCSS = flattenCSS<T>(options, stylesCreatorOptions);

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
