import type { ObjectType } from "../../types/index.types";
export interface CreateCSS {
    classes: ObjectType<string>;
    styleEleName: string | null;
}
declare function combineCSSAndCreateStyleElement(styles: ObjectType): {
    create: (stylesCreatorOptions: ObjectType) => CreateCSS;
};
export default combineCSSAndCreateStyleElement;
