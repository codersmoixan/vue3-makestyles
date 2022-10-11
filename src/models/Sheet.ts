import StyleSheet from "./StyleSheet"
import type * as Styles from "../types/index.types";

export class Sheet {
  private globalStyleSheet: StyleSheet;
  private componentStyleSheet: StyleSheet;
  private ctr: number;

  constructor() {
    this.globalStyleSheet = new StyleSheet()
    this.componentStyleSheet = new StyleSheet({ maxlength: 200 })
    this.ctr = 0
  }

  public insertSheet({ name, styleKeys }: Styles.StyleCreatorResultOptions) {
    return (rule: string) => {
      if (!name) {
        return this.globalStyleSheet.insert(rule, 'makeStyles')
      }

      if (this.ctr <= (styleKeys?.length || 1) - 1) {
        this.ctr++
        this.componentStyleSheet.insert(rule, name)
      }
    }
  }
}

const sheet = new Sheet()

export default sheet
