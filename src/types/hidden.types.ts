import type { BreakpointsKey } from './breakpoints.types'

export type MatchThresholdKey =
  | "xlUp"
  | "xlDown"
  | "lgUp"
  | "lgDown"
  | "mdUp"
  | "mdDown"
  | "smUp"
  | "smDown"
  | "xsUp"
  | "xsDown";

export interface MatchThresholdItem {
  query: string;
  key: BreakpointsKey;
}

export interface MatchThreshold {
  xlUp: MatchThresholdItem;
  xlDown: MatchThresholdItem;
  lgUp: MatchThresholdItem;
  lgDown: MatchThresholdItem;
  mdUp: MatchThresholdItem;
  mdDown: MatchThresholdItem;
  smUp: MatchThresholdItem;
  smDown: MatchThresholdItem;
  xsUp: MatchThresholdItem;
  xsDown: MatchThresholdItem;
}

export interface Authorization {
  token: string;
  type: string;
}
