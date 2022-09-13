export type PaletteColor = string | any;
export type PaletteTextColorKey =
  | "main"
  | "primary"
  | "disabled"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "white"
  | string;
export type Text = Record<PaletteTextColorKey, string>;

export interface Primary {
  main: PaletteColor;
  white: PaletteColor;
  disabled: PaletteColor;
  transparent: PaletteColor;
  black: PaletteColor;
  pending: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
  peach: PaletteColor;
  darkPeach: PaletteColor;
  silver: PaletteColor;
  linear: PaletteColor;
  primary: PaletteColor;
  secondary: PaletteColor;
}

export interface Background {
  main: PaletteColor;
  disabled: PaletteColor;
  white: PaletteColor;
  grey: PaletteColor;
  secondary: PaletteColor;
}

export interface Secondary {
  main: PaletteColor;
  black: PaletteColor;
  white: PaletteColor;
  peach: PaletteColor;
}

export type MainPrimaryKeys = "main";

export interface PaletteOptions {
  primary?: Primary;
  error?: Record<MainPrimaryKeys, string>;
  success?: Record<MainPrimaryKeys, string>;
  divider?: string;
  background?: Background;
  secondary?: Secondary;
  text?: Text;
}
