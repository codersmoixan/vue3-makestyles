import { inject } from "vue";
import createBreakpoints from "../constructors/createBreakpoints";
import { isEmpty } from "../utils/helper";
import type { Theme } from "../types/theme.types";

const useTheme = (): Theme => {
  const theme = inject<Theme>("theme");

  return isEmpty(theme)
    ? {
        breakpoints: createBreakpoints(),
      }
    : (theme as any);
};

export default useTheme;
