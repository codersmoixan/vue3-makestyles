import type { ShapeOptions, Shape } from "./shape.types";
import type { BreakpointsOptions, Breakpoints } from "./breakpoints.types";
import type { MixinsOptions, Mixins } from "./mixins.types";
import type { Shadows } from "./shadows.types";
import type { ZIndexOptions, ZIndex } from "./zIndex.types";
import type {
  TransitionsOptions,
  Transitions,
} from "./transitions.types";
import type { Spacing } from "./spacing.types";
import type { PaletteOptions } from "./palette.types";
import type { TypographyOptions } from "./typography.types";
import {ThemeUnitOptions} from "./themeUnit.types";

export type ObjectType<V = any> = Record<string, V>;

export type Direction = "ltr" | "rtl";

export type CSSOptions = ObjectType;

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  palette?: PaletteOptions;
  shadows?: Shadows;
  spacing?: Spacing;
  themeUnit?: ThemeUnitOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions;
  css?: CSSOptions;
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
  numericalCSS?: string[]
}

export interface Theme extends ObjectType{
  breakpoints: Breakpoints;
  palette?: PaletteOptions;
  shape?: Shape;
  direction?: Direction;
  mixins?: Mixins;
  shadows?: Shadows;
  spacing: Spacing;
  themeUnit?: ThemeUnitOptions;
  transitions?: Transitions;
  typography?: TypographyOptions;
  css?: CSSOptions;
  zIndex?: ZIndex;
  unstable_strictMode?: boolean;
}
