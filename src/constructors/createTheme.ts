import initTheme from "../utils/theme/initTheme";
import type * as Styles from "../types/index.types";

export default function createTheme<T extends Styles.ThemeOptions>(options: T): Styles.Theme {
  return initTheme<T>(options);
}
