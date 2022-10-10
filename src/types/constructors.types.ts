import * as Vue from "vue";
import type * as Styles from "./index.types";
import type * as GlobalCSS from "csstype"
import type { Sheet } from "../models/sheet";
import type CSS from "../models/css";

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface CreateCSSProperties {
  [k: string]: GlobalCSS.Properties<number | string | undefined | null | Styles.Spacing>
}

export type StyleRulesCallback = (
  theme: Styles.Theme,
  props?: Vue.ExtractPropTypes<Styles.InitialObject>
) => CreateCSSProperties;

export type StylesOrCreator = CreateCSSProperties | StyleRulesCallback

export interface StyleCreatorResultOptions extends Styles.InitialObject {
  id: string;
  inserted: Styles.InitialObject;
  name: string;
  meta?: string;
  classNamePrefix?: string;
  tag?: string;
  unit?: string;
  numericalCSS?: string[];
  styles?: CreateCSSProperties;
  styleKeys?: string[];
  sheet?: Sheet,
  isHashClassName?: boolean;
}

export interface StyleCreatorResult {
  create: (theme: Styles.Theme, props: Vue.ExtractPropTypes<Styles.InitialObject>, name: string) => CreateCSSProperties
  options: StyleCreatorResultOptions
}

export interface MakeStylesEffectOptions {
  theme: Styles.Theme
  stylesCreator: StyleCreatorResult
  css: CSS;
  classNames: Styles.InitialObject
}

export interface MakeStylesOptions extends Styles.InitialObject{
  name?: string
  classNamePrefix?: string,
  defaultTheme?: Styles.InitialObject,
  isHashClassName?: boolean
}
