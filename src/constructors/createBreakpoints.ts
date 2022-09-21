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

  const up = (key: Styles.BreakpointsKey, get?: boolean) => {
    const value = values[key];
    const query = `@media (min-width:${value}${unit})`;

    if (!get) { return query; }
    if (get) { return { query, value, get, status: "up" }; }
  };

  const down = (key: Styles.BreakpointsKey, get?: boolean) => {
    const value = values[key] ?? 0;
    const query = `@media (max-width:${value - step / 100}${unit})`;

    if (!get) { return query; }
    if (get) { return { query, value, get, status: "down" }; }
  };

  const between = (
    start: Styles.BreakpointsKey,
    end: Styles.BreakpointsKey,
    get?: boolean
  ) => {
    const endIndex: number = keys.indexOf(end);
    const mat = keys[endIndex];

    const startMedia = values[start];
    const startValue = values[mat] ?? 0;
    const endValue = values[end] ?? 0;
    const endMedia = (endIndex !== -1 ? startValue : endValue) - step / 100;

    const query = `@media (min-width:${startMedia}${unit}) and (max-width:${endMedia}${unit})`;

    if (!get) { return query; }
    if (get) {
      return {
        query,
        get,
        value: [startMedia, endMedia],
        status: "between",
      };
    }
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
