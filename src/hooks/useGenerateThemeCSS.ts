import { ref } from "vue";
import useTheme from "./useTheme";
import generateThemeCSS from "../utils/styled/generateThemeCSS";
import type { MakeStylesOptions } from "../types/constructors.types";

const useGenerateThemeCSS = (options: MakeStylesOptions = {}) => {
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

    const themeClass = generateThemeCSS(current);

    if (themeClass) {
      className.value = themeClass;
    }
  };

  return {
    className,
    initThemeCSS,
  };
};

export default useGenerateThemeCSS;
