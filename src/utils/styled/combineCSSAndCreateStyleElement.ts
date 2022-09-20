import generateCSS from "./generateCSS";
import generateStyleElement from "./generateStyleElement";
import generateClassName from "./generateClassName";
import { isEmpty } from "../helper";
import type { InitialObject } from "../../types/index.types";

export interface CreateCSS {
  classes: InitialObject<string>;
  styleEleName: string | null;
}

function combineCSSAndCreateStyleElement(styles: InitialObject): { create: (stylesCreatorOptions: InitialObject) => CreateCSS }  {

  return {
    create: (stylesCreatorOptions: InitialObject) : CreateCSS => {
      const classes: InitialObject<string> = {};
      let stringifyCSS = "";

      for (const key in styles) {
        if (isEmpty(styles[key])) {
          continue;
        }

        const { selector, css } = generateCSS(styles[key], stylesCreatorOptions, key);

        classes[key] = selector;
        stringifyCSS += css;
      }

      const styleElementIDName = generateClassName(stringifyCSS);
      const eleDataMeta = `${stylesCreatorOptions.meta ?? 'makeStyleElement'}__${styleElementIDName}`;
      const styleEleName = generateStyleElement(stringifyCSS, eleDataMeta);

      return {
        classes,
        styleEleName,
      };
    }
  }
}

export default combineCSSAndCreateStyleElement;
