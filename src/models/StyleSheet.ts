import { isEmpty } from "../utils/helper";

export const last = (source: any[] = []) => source[source.length - 1]

function makeStyleTag(meta: string) {
  const tag = document.createElement('style')
  tag.setAttribute("type", "text/css");
  tag.setAttribute("data-make-styles", '');
  tag.setAttribute("data-meta", meta);
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag)

  return tag
}

function sheetForTag(tag: HTMLStyleElement) {
  // tslint:disable-next-line:prefer-for-of
  for(let i = 0; i < document.styleSheets.length; i++) {
    if(document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i]
    }
  }
}

interface StyleSheetParams {
  meta?: string;
  maxlength?: number;
}

class StyleSheet {
  private maxLength: number;
  private currentLength: number;
  private meta: string;
  private tags: any[];
  private sheet: CSSStyleSheet | undefined;

  constructor({ maxlength = 4000, meta }: StyleSheetParams = {}) {
    this.maxLength = maxlength
    this.currentLength = 0
    this.meta = meta ?? 'makeStyles'
    this.tags = []
    this.sheet = undefined

    this.init()
  }

  public init(meta: string = '') {
    if (meta && meta !== this.meta) {
      this.meta = meta
      this.currentLength = 0
      this.tags.push(makeStyleTag(meta))
    }

    if (isEmpty(this.tags)) {
      this.tags.push(makeStyleTag(this.meta))
    }
  }

  public appendRules(rules: string, meta: string) {
    this.currentLength++

    if (this.currentLength % this.maxLength === 0) {
      this.currentLength = 0
      this.tags.push(makeStyleTag(meta))
    }

    const textNode = document.createTextNode('')
    last(this.tags).appendChild(textNode)
    textNode.appendData(rules)
  }

  public insert(rules: string, meta: string) {
    this.sheet = sheetForTag(last(this.tags))

    this.appendRules(rules, meta)
  }
}

export default StyleSheet

