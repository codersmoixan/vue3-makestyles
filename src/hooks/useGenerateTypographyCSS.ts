import { ref } from "vue";
import useTheme from "./useTheme";
import generateThemeTypographyCSS from "../utils/styled/generateThemeTypographyCSS";
import type { MakeStylesOptions } from "../types/constructors.types";

const useGenerateTypographyCSS = (options: MakeStylesOptions = {}) => {
  const theme = useTheme();
  const className = ref<string>("");

  const { name, classNamePrefix: classNamePrefixOption } = options
  const classNamePrefix = name || classNamePrefixOption || 'makeStyles';

  const initThemeCSS = (variant: string) => {
    const current = {
      classNamePrefix,
      theme,
      variant
    }

    const themeClass = generateThemeTypographyCSS(current);
    if (themeClass) {
      className.value = themeClass;
    }
  };

  return {
    className,
    initThemeCSS,
  };
};

export default useGenerateTypographyCSS;
