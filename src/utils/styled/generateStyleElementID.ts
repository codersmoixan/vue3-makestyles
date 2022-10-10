import generateHashName from "./generateHashName";
import { tagName } from "../../constants";

function generateStyleElementID(stringifyCSS: string): string {
  const styleElementIDName = generateHashName(stringifyCSS);

  return `${tagName}__${styleElementIDName}`;
}

export default generateStyleElementID;
