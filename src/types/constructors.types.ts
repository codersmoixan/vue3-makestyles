import * as Vue from "vue";
import type * as Styles from "./index.types";
import type * as CSS from "csstype"
import type { Sheet } from "../model/sheet";

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface CreateCSSProperties {
  [k: string]: CSS.Properties<number | string | undefined | null | Styles.Spacing>
}

export type StyleRulesCallback = (
  theme: Styles.Theme,
  props?: Vue.ExtractPropTypes<Styles.InitialObject>
) => CreateCSSProperties;

export type StylesOrCreator = CreateCSSProperties | StyleRulesCallback

export interface StyleCreatorResultOptions extends Styles.InitialObject {
  name?: string;
  meta?: string;
  classNamePrefix?: string;
  isHashClassName?: boolean;
  tag?: string;
  unit?: string;
  numericalCSS?: string[];
  sheet?: Sheet,
  styles?: CreateCSSProperties;
  styleKeys?: string[]
}

export interface StyleCreatorResult {
  create: (theme: Styles.Theme, props: Vue.ExtractPropTypes<Styles.InitialObject>, name: string) => CreateCSSProperties
  options: StyleCreatorResultOptions
}

export interface MakeStylesEffectOptions {
  classNamePrefix: string
  theme: Styles.Theme
  stylesCreator: StyleCreatorResult
  styleEleName: Vue.Ref<string | null>
  classNames: Styles.InitialObject
  name: string
}

export interface MakeStylesOptions extends Styles.InitialObject{
  name?: string
  classNamePrefix?: string,
  defaultTheme?: Styles.InitialObject,
  isHashClassName?: boolean
}
