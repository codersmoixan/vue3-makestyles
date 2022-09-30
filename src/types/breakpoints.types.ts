export type BreakpointsKey = "xs" | "sm" | "md" | "lg" | "xl";

export type BreakpointsQueryKey = 'up' | 'down' | 'between'

export type QueryResult = string | {
  query: string;
  value?: number | any[];
  get?: boolean;
  status?: string;
}

export type QueryFunction = (key: BreakpointsKey, get?: boolean) => QueryResult;

export type BetweenQueryFunction = (start: BreakpointsKey, end: BreakpointsKey, get?: boolean) => QueryResult

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
  up: QueryFunction;
  down: QueryFunction;
  between: BetweenQueryFunction;
  keys?: BreakpointsKey[];
}
