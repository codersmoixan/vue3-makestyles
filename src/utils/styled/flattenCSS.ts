import { toLine, isObject, isEmpty, isNumber } from "../helper";
import numericalCSS from "../../constants/numericalCSS";
import type * as Styles from "../../types/index.types"

function flattenCSS(CSSOptions: Styles.InitialObject, stylesCreatorOptions: Styles.InitialObject): string[] {
  const CSSChunk: string[] = [];
  const { unit, numericalCSS: numericalCss } = stylesCreatorOptions

  for (const [key, value] of Object.entries(CSSOptions)) {
    if (isEmpty(value)) {
      continue;
    }

    if (isObject(value)) {
      CSSChunk.push(`${key} {`, ...flattenCSS(value, stylesCreatorOptions), "}");
    } else if (isNumber(value)) {
      const CSSNumerical = numericalCss ? [...new Set([...numericalCSS, ...numericalCss])] : numericalCSS

      if (CSSNumerical.includes(key)) {
        CSSChunk.push(`${toLine(key)}: ${value};`)
      } else {
        CSSChunk.push(`${toLine(key)}: ${value}${unit};`)
      }
    } else {
      CSSChunk.push(`${toLine(key)}: ${value};`);
    }
  }

  return CSSChunk;
}

export default flattenCSS;
