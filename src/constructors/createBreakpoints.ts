import type * as Styles from "../types/breakpoints.types";

function createBreakpoints(breakpoints: Styles.BreakpointsOptions = {}): Styles.Breakpoints {
  const {
    values = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1680,
    },
    unit = "px",
    step = 5,
  }: Styles.BreakpointsOptions = breakpoints;

  const keys = Object.keys(values) as Styles.BreakpointsKey[];

  const up = (key: Styles.BreakpointsKey) => {
    const value = values[key];

    return `@media (min-width:${value}${unit})`;
  };

  const down = (key: Styles.BreakpointsKey) => {
    const value = values[key] ?? 0;

    return `@media (max-width:${value - step / 100}${unit})`;
  };

  const between = (
    start: Styles.BreakpointsKey,
    end: Styles.BreakpointsKey,
  ) => {
    const endIndex: number = keys.indexOf(end);
    const mat = keys[endIndex];

    const startMedia = values[start];
    const startValue = values[mat] ?? 0;
    const endValue = values[end] ?? 0;
    const endMedia = (endIndex !== -1 ? startValue : endValue) - step / 100;

    return `@media (min-width:${startMedia}${unit}) and (max-width:${endMedia}${unit})`;
  };

  return {
    values,
    keys,
    unit,
    step,
    up,
    down,
    between,
  };
}

export default createBreakpoints;
