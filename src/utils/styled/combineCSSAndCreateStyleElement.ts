import generateCSS from "./generateCSS";
import generateStyleElement from "./generateStyleElement";
import generateClassName from "./generateClassName";
import { isEmpty } from "../helper";
import type { ObjectType } from "../../types/index.types";

export interface CreateCSS {
  classes: ObjectType<string>;
  styleEleName: string | null;
}

function combineCSSAndCreateStyleElement(styles: ObjectType): { create: (stylesCreatorOptions: ObjectType) => CreateCSS }  {

  return {
    create: (stylesCreatorOptions: ObjectType) : CreateCSS => {
      const classes: ObjectType<string> = {};
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
