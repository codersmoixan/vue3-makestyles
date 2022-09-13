export type BreakpointsKey = "xs" | "sm" | "md" | "lg" | "xl";

export type MatchFunction = (key: BreakpointsKey, get?: boolean) => any;

export interface BreakpointsValues {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface BreakpointsOptions {
  values?: BreakpointsValues;
  unit?: string;
  step?: number;
}

export interface Breakpoints extends BreakpointsOptions {
  up: MatchFunction;
  down: MatchFunction;
  between: (start: BreakpointsKey, end: BreakpointsKey, get?: boolean) => any;
  keys?: BreakpointsKey[];
}
