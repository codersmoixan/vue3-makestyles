// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hashStr from "glamor/lib/hash";
import generateAlphabeticName, { charsStr } from "./generateAlphabeticName";

function randomRange(min: number = 5, max?: number): string {
  let returnStr = ""

  const range = (max ? Math.round(Math.random() * (max-min)) + min : min);
  for(let i = 0; i < range; i++){
    const index = Math.round(Math.random() * (charsStr.length-1));
    returnStr += charsStr.substring(index, index + 1);
  }

  return returnStr;
}

function generateHashName(h: string = randomRange()): string {
  const hash = hashStr(h);

  return generateAlphabeticName(hash);
}

export default generateHashName;
