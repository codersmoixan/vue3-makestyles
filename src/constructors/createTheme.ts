import initTheme from "../utils/theme/initTheme";
import type { Theme, ThemeOptions } from "../types/index.types";

export default function createTheme<T extends ThemeOptions>(options: T): Theme {
  return initTheme<T>(options);
}
