import generateCSS from "./generateCSS";
import generateStyleElement from "./generateStyleElement";
import generateClassName from "./generateClassName";
import { isEmpty } from "../helper";
import { tagName } from "../../constants";
import type * as Styles from "../../types/index.types"

export interface CreateCSS {
  classes: Styles.InitialObject<string>;
  styleEleName: string | null;
}

function combinedCSSAndCreateStyleElement(styles: Styles.InitialObject): { create: (stylesCreatorOptions: Styles.InitialObject) => CreateCSS }  {

  return {
    create: (stylesCreatorOptions: Styles.MakeStylesOptions) : CreateCSS => {
      const classes: Styles.InitialObject<string> = {};
      let stringifyCSS = "";

      for (const [key, value] of Object.entries(styles)) {
        if (isEmpty(value)) {
          continue;
        }

        const { selector, css } = generateCSS(value, stylesCreatorOptions, key);

        classes[key] = selector;
        stringifyCSS += css;
      }

      const styleElementIDName = generateClassName(stringifyCSS);
      const eleDataMeta = `${stylesCreatorOptions.meta ?? tagName}__${styleElementIDName}`;
      const styleEleName = generateStyleElement(stringifyCSS, eleDataMeta);

      return {
        classes,
        styleEleName,
      };
    }
  }
}

export default combinedCSSAndCreateStyleElement;
