import * as Vue from "vue";
import type { Theme } from "./theme.types";

export interface GeneratedCSS {
  css: string;
  selector: string;
}

export interface GenerateThemeParam {
  classNamePrefix: string
  theme: Theme
  variant: string
  element?: Vue.Ref
}
