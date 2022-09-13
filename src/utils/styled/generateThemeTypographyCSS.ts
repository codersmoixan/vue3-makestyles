import {isUndefined} from "../helper";
import generateCSS from "./generateCSS";
import generateStyleElement from "./generateStyleElement";
import generateStyleElementID from "./generateStyleElementID";
import { GenerateThemeParam } from "../../types/generateCSS.type";

function generateThemeTypographyCSS(options: GenerateThemeParam): string | null {
  const { variant, theme, element, classNamePrefix } = options
  if (isUndefined(variant)) return null;

  const variantThemeOptions = theme.typography?.[variant];

  if (isUndefined(variantThemeOptions)) {
    console.error(
      'A valid "variant" value needs to be passed in, which belongs to the valid values defined in "typography" in "theme.ts/.js"'
    );

    return null;
  }

  const { css, selector } = generateCSS(variantThemeOptions, {
    unit: theme.themeUnit?.unit,
    classNamePrefix
  });
  const eleName = generateStyleElementID(css);
  generateStyleElement(css, eleName, selector, element);

  return selector;
}

export default generateThemeTypographyCSS;
