export type BreakpointsKey = "xs" | "sm" | "md" | "lg" | "xl";

export type BreakpointsQueryHookKey = 'up' | 'down' | 'between'

export type BreakpointsQueryHook = (key: BreakpointsKey, get?: boolean) => string;

export type BreakpointsBetweenQueryHook = (start: BreakpointsKey, end: BreakpointsKey, get?: boolean) => string

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
  up: BreakpointsQueryHook;
  down: BreakpointsQueryHook;
  between: BreakpointsBetweenQueryHook;
  keys?: BreakpointsKey[];
}
