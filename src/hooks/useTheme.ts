import * as Vue from "vue";
import { isEmpty } from "../utils/helper";
import initTheme from "../utils/theme/initTheme";
import type * as Styles from "../types/index.types";

const useTheme = (): (Styles.Theme) => {
  const theme = Vue.inject<Styles.Theme>("theme");

  if (isEmpty(theme) || typeof theme === "undefined") {
    return initTheme({})
  }

  return theme
};

export default useTheme;
