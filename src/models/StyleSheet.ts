export const last = (source: any[] = []) => source[source.length - 1]

interface CssSheet {
  sheet?: HTMLStyleElement,
  meta?: string
}

function makeStyleTag(meta: string) {
  const tag = document.createElement('style')
  tag.setAttribute("type", "text/css");
  tag.setAttribute("data-make-styles", '');
  tag.setAttribute("data-meta", meta);
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag)

  return tag
}

function sheetForTag(tags: HTMLStyleElement[], meta: string): CssSheet {
  // tslint:disable-next-line:prefer-for-of
  for(let i = 0; i < tags.length; i++) {
    // @ts-ignore
    const dataMeta = tags[i].getAttribute('data-meta')

    if(dataMeta === meta) {
      return {
        sheet: tags[i],
        meta: dataMeta
      }
    }
  }

  return {}
}

interface StyleSheetParams {
  maxlength?: number;
}

class StyleSheet {
  private readonly maxLength: number;
  private readonly tags: HTMLStyleElement[];
  private currentLength: number;
  private meta: string;
  private cssSheet: CssSheet;

  constructor({ maxlength = 4000 }: StyleSheetParams = {}) {
    this.maxLength = maxlength
    this.currentLength = 0
    this.meta = ''
    this.tags = []
    this.cssSheet = {}
  }

  public init(meta: string = '') {
    this.meta = meta
    this.currentLength = 0
    this.tags.push(makeStyleTag(meta))
  }

  public insert(rules: string, meta: string) {
    this.cssSheet = sheetForTag(this.tags, meta)

    this.currentLength++

    if (this.currentLength % this.maxLength === 0) {
      this.init(meta)
    }

    const textNode = document.createTextNode('')
    textNode.appendData(rules)

    return this.cssSheet.meta === meta ? this.cssSheet.sheet?.appendChild(textNode) :last(this.tags).appendChild(textNode)
  }

  public getOptions() {
    return {
      maxLength: this.maxLength,
      currentLength: this.currentLength,
      meta: this.meta,
      tags: this.tags,
      cssSheet: this.cssSheet
    }
  }
}

export default StyleSheet

