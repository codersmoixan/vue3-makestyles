// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hashStr from "glamor/lib/hash";
import generateAlphabeticName from "./generateAlphabeticName";

function generateClassName(h: string): string {
  const hash = hashStr(h);

  return generateAlphabeticName(hash);
}

export default generateClassName;
