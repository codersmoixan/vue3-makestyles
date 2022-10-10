import generateHashName from "../utils/styled/generateHashName";
import { isEmpty, isNumber, isObject, isUndefined, toLine } from "../utils/helper";
import stringifyCSS from "../utils/styled/stringifyCSS";
import stylis from "stylis";
import numericalCSS from "../constants/numericalCSS";
import type * as Styles from "../types/index.types"

function createClassName({stringCSS, className = '', stylesCreatorOptions}: { stringCSS: string, stylesCreatorOptions: Styles.MakeStylesOptions, className?: string }): string {
  const { classNamePrefix, isHashClassName } = stylesCreatorOptions
  const selector = generateHashName(stringCSS);
  const isInClassName = isUndefined(className)

  if (isHashClassName) {
    return isInClassName ? `${classNamePrefix}-${selector}` : `${classNamePrefix}-${className}__${selector}`;
  }

  return  isUndefined(className)
    ? `${classNamePrefix}-${selector}`
    : `${classNamePrefix}-${className}`;
}

class CSS {
  private creatorOptions: Styles.StyleCreatorResultOptions;

  constructor(options: Styles.StyleCreatorResultOptions) {
    this.creatorOptions = options
  }

  public init(creatorOptions: Styles.StyleCreatorResultOptions) {
    this.creatorOptions = creatorOptions

    return this.create()
  }

  public create() {
    return ({
      create: (styles: Styles.CreateCSSProperties): Styles.InitialObject<string> => {
        const { id, inserted, sheet, meta } = this.creatorOptions
        const label = id ?? 'ms'

        if (inserted[label]) {
          return {}
        }

        const classes: Styles.InitialObject<string> = {};
        let stringifyCss = "";

        const insert = sheet?.insertSheet(this.creatorOptions)
        for (const [key, value] of Object.entries(styles)) {
          if (isEmpty(value)) {
            continue;
          }

          const { selector, css } = this.generate(value, key);
          insert?.(css)

          classes[key] = selector;
          stringifyCss += css;
        }


        inserted[label] = classes

        return classes;
      }
    })
  }

  public generate(options: object, className?: string) {
    const flatCSS = this.flatten(options);
    const stringCSS = stringifyCSS(flatCSS);

    const selectorName = createClassName({
        stringCSS,
        stylesCreatorOptions: this.creatorOptions,
        className
      })
    const css = stylis(`.${selectorName}`, stringCSS);

    return {
      css,
      selector: selectorName,
    };
  }

  public flatten(CSSOptions: object) {
    const CSSChunk: string[] = [];
    const { unit, numericalCSS: numericalCss } = this.creatorOptions

    for (const [key, value] of Object.entries(CSSOptions)) {
      if (isEmpty(value)) {
        continue;
      }

      if (isObject(value)) {
        CSSChunk.push(`${key} {`, ...this.flatten(value), "}");
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
}

export default CSS;
