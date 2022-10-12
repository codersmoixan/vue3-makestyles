import generateHashName from "../utils/styled/generateHashName";
import { objectMerge, isEmpty, isNumber, isObject, isUndefined, toLine } from "../utils/helper";
import stringifyCSS from "../utils/styled/stringifyCSS";
import stylis from "stylis";
import numericalCSS from "../constants/numericalCSS";
import type * as Styles from "../types/index.types"

interface CreateClassNameResult {
  stringCSS: string;
  stylesCreatorOptions: Styles.MakeStylesOptions;
  className?: string
}

function createClassName({
  stringCSS,
  className,
  stylesCreatorOptions
}: CreateClassNameResult): string {
  const { classNamePrefix, isHashClassName } = stylesCreatorOptions
  const { selector } = generateHashName(stringCSS);
  const isInClassName = isUndefined(className)

  if (isHashClassName) {
    return isInClassName ? `${classNamePrefix}-${selector}` : `${classNamePrefix}-${className}__${selector}`;
  }

  return  isUndefined(className)
    ? `${classNamePrefix}-${selector}`
    : `${classNamePrefix}-${className}`;
}

class CSS {
  private initHash: string;
  private creatorOptions: Styles.StyleCreatorResultOptions;
  private inserted: Styles.InitialObject;

  constructor(options: Styles.StyleCreatorResultOptions) {
    this.creatorOptions = options
    this.inserted = {} as Styles.InitialObject<number>
    this.initHash = ''
  }

  public init(creatorOptions: Styles.StyleCreatorResultOptions) {
    this.creatorOptions = creatorOptions

    return {
      create: (styles: Styles.CreateCSSProperties) => this.create(styles)
    }
  }

  public create(styles: Styles.CreateCSSProperties): Styles.InitialObject<string> {
    const insert = this.creatorOptions.sheet?.insertSheet(this.creatorOptions)
    const { classes, stringifyCss } = this.stringify(styles)
    const { hash } = generateHashName(stringifyCss)
    const initHashInserted = this.inserted[this.initHash] ?? {}

    this.initHash = this.initHash || hash

    if (this.inserted[hash]) {
      return objectMerge(initHashInserted, this.inserted[hash])
    }

    if (isEmpty(classes) || !stringifyCss) {
      return this.inserted[this.initHash]
    }

    this.inserted[hash] = classes
    insert?.(stringifyCss)

    return objectMerge(initHashInserted, classes)
  }

  public generate(options: Styles.CSSProperties, className: string) {
    const flatCSS = this.flatten(options);
    const stringCSS = stringifyCSS(flatCSS);

    const selector = createClassName({
      stringCSS,
      stylesCreatorOptions: this.creatorOptions,
      className
    })
    const css = stylis(`.${selector}`, stringCSS);

    return {
      css,
      selector,
      className
    };
  }

  public flatten(CSSOptions: Styles.CSSProperties) {
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

  public stringify(styles: Styles.CreateCSSProperties) {
    const classes: Styles.InitialObject<string> = {};
    const inserted = this.inserted[this.initHash]
    let stringifyCss = "";

    for (const [key, value] of Object.entries(styles)) {
      if (isEmpty(value)) {
        continue;
      }

      const { selector, css, className } = this.generate(value, key);

      if (inserted && inserted[className] === selector) {
        continue
      }

      classes[key] = selector;
      stringifyCss += css;
    }

    return {
      classes,
      stringifyCss
    };
  }
}

export default CSS;