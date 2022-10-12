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

  public insertSheet({ name }: Styles.StyleCreatorResultOptions) {
    return (rule: string) => !name ? this.globalStyleSheet.insert(rule, 'makeStyles') : this.componentStyleSheet.insert(rule, name)
  }
}

export default Sheet
