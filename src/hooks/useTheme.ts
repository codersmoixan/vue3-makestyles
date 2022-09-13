import createBreakpoints from "../constructors/createBreakpoints";
import { inject } from "vue";
import {isEmpty} from "../utils/helper";
import type { Theme } from "../types/index.types";

const useTheme = (): Theme => {
  const theme = inject<Theme>("theme");

  return isEmpty(theme)
    ? {
        breakpoints: createBreakpoints(),
      }
    : (theme as any);
};

export default useTheme;
