import createBreakpoints from "../../constructors/createBreakpoints";
import {isEmpty} from "../helper";
import {isUndefined} from "../helper";
import type { ThemeOptions } from "../../types/index.types";

function initTheme(options: ThemeOptions = {}): ThemeOptions {
  const {
    themeUnit = {
      step: 8,
      unit: "px",
    },
    palette,
    typography = {},
    mixins = {},
    shape = {},
    breakpoints: propsBreakpoints = { ...themeUnit },
    ...other
  } = options;

  const breakpoints = createBreakpoints(propsBreakpoints);

  const createSpacing = (...arg: number[]): string | null => {
    if (isUndefined(themeUnit) || isEmpty(themeUnit)) return null;

    const complete = arg.map(
      (i) => `${(themeUnit.step ?? 8) * i}${themeUnit.unit}`
    );

    return complete.join(" ");
  };

  return {
    spacing: createSpacing as any,
    themeUnit,
    breakpoints,
    palette,
    typography,
    mixins,
    shape,
    ...other,
  };
}

export default initTheme;
