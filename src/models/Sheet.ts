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
      maxCount: 200,
    })
  }

  public initStyleSheet({ meta, global }: { meta: string, global?: boolean }) {
    return global ? this.globalStyleSheet.init(meta) : this.componentStyleSheet.init(meta)
  }

  public insertSheet(options: Styles.StyleCreatorResultOptions) {
    this.creatorOptions = options
    const { meta, name } = options

    return (rule: string) => {
      if(name) {
        const sheetOptions = this.componentStyleSheet.getOptions()
        if (sheetOptions.meta !== name) {
          this.initStyleSheet({ meta: name })
        }

        this.componentStyleSheet.insert(rule, name)
      } else {
        const { cssSheet } = this.globalStyleSheet.getOptions()
        if (cssSheet.meta !== meta) {
          this.initStyleSheet({ meta, global: true })
        }

        this.globalStyleSheet.insert(rule, meta)
      }
    }
  }
}

const sheet = new Sheet()

export default sheet
