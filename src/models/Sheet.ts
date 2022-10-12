import StyleSheet from "./StyleSheet"
import type * as Styles from "../types/index.types";

export class Sheet {
  private globalStyleSheet: StyleSheet;
  private componentStyleSheet: StyleSheet;
  private creatorOptions: object;

  constructor() {
    this.creatorOptions = {}
    this.globalStyleSheet = new StyleSheet()
    this.componentStyleSheet = new StyleSheet({
      maxlength: 200,
    })
  }

  public initStyleSheet(meta: string) {
    if (meta) {
      this.componentStyleSheet.init(meta)
    }
  }

  public insertSheet(options: Styles.StyleCreatorResultOptions) {
    const { meta, name } = options

    return (rule: string) => {
      if(name) {
        this.initStyleSheet(name)
        this.componentStyleSheet.insert(rule, name)
      } else {
        this.globalStyleSheet.insert(rule, meta)
      }
    }
  }
}

const sheet = new Sheet()

export default sheet
