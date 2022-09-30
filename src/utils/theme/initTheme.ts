import createBreakpoints from "../../constructors/createBreakpoints";
import {isEmpty, isUndefined} from "../helper";
import type * as Styles from "../../types/theme.types";

function initTheme<T extends Styles.ThemeOptions>(options: T): Styles.Theme {
  const {
    themeUnit = {
      step: 8,
      unit: "px",
    },
    palette = {},
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
    mixins,
    shape,
    palette,
    css,
    ...other,
  };
}

export default initTheme;
