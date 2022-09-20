import type {
  Breakpoints,
  BreakpointsOptions,
  BreakpointsKey,
} from "../types/breakpoints.types";

function createBreakpoints(breakpoints: BreakpointsOptions = {}): Breakpoints {
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
  }: BreakpointsOptions = breakpoints;

  const keys = Object.keys(values) as BreakpointsKey[];

  const up = (key: BreakpointsKey, get?: boolean) => {
    const value = values[key];
    const query = `@media (min-width:${value}${unit})`;

    if (!get) { return query; }
    if (get) { return { query, value, get, status: "up" }; }
  };

  const down = (key: BreakpointsKey, get?: boolean) => {
    const value = values[key] ?? 0;
    const query = `@media (max-width:${value - step / 100}${unit})`;

    if (!get) { return query; }
    if (get) { return { query, value, get, status: "down" }; }
  };

  const between = (
    start: BreakpointsKey,
    end: BreakpointsKey,
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
