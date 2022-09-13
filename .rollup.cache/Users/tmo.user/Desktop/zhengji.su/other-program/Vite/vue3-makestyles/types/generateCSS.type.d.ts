import type { Ref } from "vue";
import type { Theme } from "./index.types";
export interface GeneratedCSS {
    css: string;
    selector: string;
}
export interface GenerateThemeParam {
    classNamePrefix: string;
    theme: Theme;
    variant: string;
    element?: Ref;
}
