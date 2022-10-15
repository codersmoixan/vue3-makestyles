import * as Vue from "vue";
import type * as Spacing from "./spacing.types";
import type * as Theme from "./theme.types"
import type * as GlobalCSS from "csstype"
import { Sheet } from "../models/Sheet";
import * as Styles from "./index.types";

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export type CSSProperties = GlobalCSS.Properties<number | string | undefined | null | Spacing.Spacing>

export type BaseCssProperties = {
  [K in keyof Styles.CSSProperties]: Styles.CSSProperties[K]
}

export interface CreateCSSProperties extends BaseCssProperties{
  [k: string]: BaseCssProperties[keyof BaseCssProperties] | CreateCSSProperties
}

export type StylesCSSOptions = CreateCSSProperties | StylesProperties

export interface StylesProperties {
  [k: string]: StylesCSSOptions
}

export type StyleRulesCallback = (
  theme: Theme.Theme,
  props?: Vue.ExtractPropTypes<Theme.InitialObject>
) => StylesProperties;

export type StylesOrCreator = StylesProperties | StyleRulesCallback

export interface StyleCreatorInitOptions {
  name: string;
  meta: string;
  sheet: Sheet;
  isStyled: boolean
}

export interface StyleCreatorUpdateOptions extends Theme.InitialObject {
  classNamePrefix?: string;
  unit?: string;
  numericalCSS?: string[];
  styles?: CreateCSSProperties;
  styleKeys?: string[];
  isHashClassName?: boolean;
}

export interface StyleCreatorResultOptions extends StyleCreatorInitOptions, StyleCreatorUpdateOptions {}

export interface MakeStylesOptions extends Theme.InitialObject{
  name?: string
  classNamePrefix?: string;
  defaultTheme?: Theme.InitialObject;
  isHashClassName?: boolean;
  isStyled?: boolean
}
