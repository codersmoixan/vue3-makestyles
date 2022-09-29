import generateClassName from "./generateClassName";
import { tagName } from "../../constants";

function generateStyleElementID(stringifyCSS: string): string {
  const styleElementIDName = generateClassName(stringifyCSS);

  return `${tagName}__${styleElementIDName}`;
}

export default generateStyleElementID;
