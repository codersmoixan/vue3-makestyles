import type { ObjectType } from "../types/index.types";
import type { MakeStylesOptions, StyleOrCreator } from "./types/index.types";
declare function makeStyles(stylesOrCreator: StyleOrCreator, options?: MakeStylesOptions): (props?: object) => ObjectType<any>;
export default makeStyles;
