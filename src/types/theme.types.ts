import type { ShapeOptions, Shape } from "./shape.types";
import type { BreakpointsOptions, Breakpoints } from "./breakpoints.types";
import type { MixinsOptions, Mixins } from "./mixins.types";
import type { Spacing } from "./spacing.types";
import type { ThemeUnitOptions } from "./themeUnit.types";
import type { CreateCSSProperties } from "./styles.types";

export type InitialObject<V = any> = Record<string, V>;

export interface CSSOptions {
  [k: string]: CreateCSSProperties
}

export type Palette = InitialObject;

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions
  mixins?: MixinsOptions;
  palette?: Palette;
  spacing?: Spacing;
  themeUnit?: ThemeUnitOptions;
  css?: CSSOptions;
  numericalCSS?: string[]
}

export interface Theme extends InitialObject{
  breakpoints: Breakpoints;
  palette: Palette;
  shape: Shape;
  mixins: Mixins;
  spacing: Spacing;
  themeUnit: ThemeUnitOptions;
  css: CSSOptions;
}
