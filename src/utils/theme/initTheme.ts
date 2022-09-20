import createBreakpoints from "../../constructors/createBreakpoints";
import {isEmpty, isUndefined} from "../helper";
import type { Theme, ThemeOptions } from "../../types/index.types";

function initTheme<T extends ThemeOptions>(options: T): Theme {
  const {
    themeUnit = {
      step: 8,
      unit: "px",
    },
    palette = {},
    typography = {},
    mixins = {},
    shape = {},
    breakpoints: propsBreakpoints = { ...themeUnit },
    css = {},
    ...other
  } = options;

  const breakpoints = createBreakpoints(propsBreakpoints);

  const createSpacing = (...arg: number[]): string | null => {
    if (isUndefined(themeUnit) || isEmpty(themeUnit)) { return null; }

    const complete = arg.map(
      (i) => `${(themeUnit.step ?? 8) * i}${themeUnit.unit}`
    );

    return complete.join(" ");
  };

  return {
    spacing: createSpacing,
    themeUnit,
    breakpoints,
    typography,
    mixins,
    shape,
    palette,
    css,
    ...other,
  };
}

export default initTheme;
