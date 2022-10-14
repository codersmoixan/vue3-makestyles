import * as Vue from "vue";
import type * as Styles from "./index.types";
import type * as GlobalCSS from "csstype"
import { Sheet } from "../models/Sheet";

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type CSSProperties = GlobalCSS.Properties<number | string | undefined | null | Styles.Spacing | any>

export interface CreateCSSProperties {
  [k: string]: CSSProperties | CreateCSSProperties
}

export type StyleRulesCallback = (
  theme: Styles.Theme,
  props?: Vue.ExtractPropTypes<Styles.InitialObject>
) => CreateCSSProperties;

export type StylesOrCreator = CreateCSSProperties | StyleRulesCallback

export interface StyleCreatorInitOptions {
  name: string;
  meta: string;
  sheet: Sheet;
}

export interface StyleCreatorUpdateOptions extends Styles.InitialObject {
  classNamePrefix?: string;
  unit?: string;
  numericalCSS?: string[];
  styles?: CreateCSSProperties;
  styleKeys?: string[];
  isHashClassName?: boolean;
}

export interface StyleCreatorResultOptions extends StyleCreatorInitOptions, StyleCreatorUpdateOptions {}

export interface MakeStylesOptions extends Styles.InitialObject{
  name?: string
  classNamePrefix?: string,
  defaultTheme?: Styles.InitialObject,
  isHashClassName?: boolean
}
