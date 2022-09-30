export type BreakpointsKey = "xs" | "sm" | "md" | "lg" | "xl";

export type BreakpointsQueryHookKey = 'up' | 'down' | 'between'

export type BreakpointsQueryResult = string | {
  query: string;
  value?: number | any[];
  get?: boolean;
  status?: string;
}

export type BreakpointsQueryHook = (key: BreakpointsKey, get?: boolean) => BreakpointsQueryResult;

export type BreakpointsBetweenQueryHook = (start: BreakpointsKey, end: BreakpointsKey, get?: boolean) => BreakpointsQueryResult

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
