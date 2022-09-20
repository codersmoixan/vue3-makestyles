import type { ExtractPropTypes, Ref } from "vue";
import type { InitialObject, Theme } from "../../types/index.types";

export type StyleOrCreator = InitialObject | ((theme: Theme, props?: ExtractPropTypes<InitialObject>) => any)
export interface StyleCreatorValue {
  create: (theme: Theme, props: ExtractPropTypes<InitialObject>, name: string) => any | InitialObject
  options: InitialObject
}
export interface EffectOptions {
  classNamePrefix: string
  theme: Theme
  stylesCreator: StyleCreatorValue
  styleEleName: Ref<string | null>
  classNames: InitialObject
  name: string
}
export interface MakeStylesOptions extends InitialObject{
  name?: string
  classNamePrefix?: string,
  defaultTheme?: InitialObject
}
