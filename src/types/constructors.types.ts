import * as Vue from "vue";
import * as Styles from "./index.types";

export type StyleOrCreator = Styles.InitialObject | ((theme: Styles.Theme, props?: Vue.ExtractPropTypes<Styles.InitialObject>) => any)
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
  defaultTheme?: Styles.InitialObject
}
