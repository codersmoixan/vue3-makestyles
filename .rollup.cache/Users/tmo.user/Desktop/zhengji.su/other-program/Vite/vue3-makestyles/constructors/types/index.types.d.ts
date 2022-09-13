import type { ExtractPropTypes, Ref } from "vue";
import type { ObjectType, Theme } from "../../types/index.types";
export declare type StyleOrCreator = (theme: Theme, props?: ExtractPropTypes<ObjectType>) => any | ObjectType;
export interface StyleCreatorValue {
    create: (theme: Theme, props: ExtractPropTypes<ObjectType>, name: string) => any | ObjectType;
    options: ObjectType;
}
export interface EffectOptions {
    classNamePrefix: string;
    theme: Theme;
    stylesCreator: StyleCreatorValue;
    styleEleName: Ref<string | null>;
    classNames: ObjectType;
    name: string;
}
export interface MakeStylesOptions extends ObjectType {
    componentName?: string;
    classNamePrefix?: string;
    defaultTheme?: ObjectType;
}
