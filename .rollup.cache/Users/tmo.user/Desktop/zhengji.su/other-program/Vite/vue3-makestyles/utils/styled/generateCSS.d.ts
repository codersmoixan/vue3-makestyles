import type { ObjectType } from "../../types/index.types";
import type { GeneratedCSS } from "../../types/generateCSS.type";
declare function generateCSS<T = ObjectType>(options: T, stylesCreatorOptions: ObjectType, className?: string): GeneratedCSS;
export default generateCSS;
