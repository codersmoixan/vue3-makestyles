import * as Vue from "vue";
import type * as Styles from "./index.types";
import type * as CSS from "csstype"

export interface CreateCSSProperties {
  [k: string]: CSS.Properties<number | string | undefined | null | Styles.Spacing>
}

export type StyleRulesCallback = (
  theme: Styles.Theme,
  props?: Vue.ExtractPropTypes<Styles.InitialObject>
) => CreateCSSProperties;

export type StylesOrCreator = CreateCSSProperties | StyleRulesCallback

export interface StyleCreatorValue {
  create: (theme: Styles.Theme, props: Vue.ExtractPropTypes<Styles.InitialObject>, name: string) => any | Styles.InitialObject
  options: Styles.InitialObject
}

export interface EffectOptions {
  classNamePrefix: string
  theme: Styles.Theme
  stylesCreator: StyleCreatorValue
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
