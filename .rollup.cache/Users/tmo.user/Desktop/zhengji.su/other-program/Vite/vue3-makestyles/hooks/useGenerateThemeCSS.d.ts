import type { MakeStylesOptions } from "../constructors/types/index.types";
declare const useGenerateThemeCSS: (options?: MakeStylesOptions) => {
    className: import("vue").Ref<string>;
    initThemeCSS: (variant: string) => void;
};
export default useGenerateThemeCSS;
