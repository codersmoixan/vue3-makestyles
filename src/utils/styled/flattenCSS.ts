import {toLine, isObject, isEmpty, isNumber} from "../helper";
import numericalCSS from "../../constants/numericalCSS";
import type { ObjectType } from "../../types/index.types";

function flattenCSS<T = ObjectType>(CSSOptions: T, stylesCreatorOptions: ObjectType): string[] {
  const CSSChunk: string[] = [];
  const { unit, numericalCSS: numericalCss } = stylesCreatorOptions

  for (const key in CSSOptions) {
    if (isEmpty(CSSOptions[key])) {
      continue;
    }

    if (isObject(CSSOptions[key])) {
      CSSChunk.push(`${key} {`, ...flattenCSS(CSSOptions[key], stylesCreatorOptions), "}");
    } else if (isNumber(CSSOptions[key])) {
      const CSSNumerical = numericalCss ? [...new Set([...numericalCSS, ...numericalCss])] : numericalCSS

      if (CSSNumerical.includes(key)) {
        CSSChunk.push(`${toLine(key)}: ${CSSOptions[key]};`)
      } else {
        CSSChunk.push(`${toLine(key)}: ${CSSOptions[key]}${unit};`)
      }
    } else {
      CSSChunk.push(`${toLine(key)}: ${CSSOptions[key]};`);
    }
  }

  return CSSChunk;
}

export default flattenCSS;
