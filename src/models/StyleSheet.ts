export const last = (source: any[]) => source[source.length - 1]

interface Tag {
  tag: HTMLStyleElement,
  count: number
}

interface CssSheet {
  sheet: Tag,
  meta: string
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

function sheetForTag(tags: Tag[], meta: string) {
  const findTags = []
  // tslint:disable-next-line:prefer-for-of
  for(let i = 0; i < tags.length; i++) {
    const dataMeta = tags[i].tag.getAttribute('data-meta')

    if(dataMeta === meta) {
      findTags.push({
        sheet: tags[i],
        meta: dataMeta
      })
    }
  }

  return last(findTags)
}

interface StyleSheetParams {
  maxCount?: number;
}

class StyleSheet {
  private readonly maxCount: number;
  private readonly tags: Tag[];
  private meta: string;
  private cssSheet: CssSheet;

  constructor({ maxCount = 4000 }: StyleSheetParams = {}) {
    this.maxCount = maxCount
    this.meta = ''
    this.tags = []
    this.cssSheet = {} as any
  }

  public init(meta: string = '') {
    this.meta = meta
    this.tags.push({
      tag: makeStyleTag(meta),
      count: 0
    })
  }

  public insert(rules: string, meta: string) {
    this.cssSheet = sheetForTag(this.tags, meta) as CssSheet
    const identical = this.cssSheet.meta === meta

    this.cssSheet.sheet.count++
    const textNode = document.createTextNode('')
    textNode.appendData(rules)

    if (this.cssSheet.sheet.count % this.maxCount === 0 || !identical) {
      this.init(meta)
      return last(this.tags).tag.appendChild(textNode)
    }

    this.cssSheet.sheet?.tag.appendChild(textNode)
  }

  public getOptions() {
    return {
      maxCount: this.maxCount,
      meta: this.meta,
      tags: this.tags,
      cssSheet: this.cssSheet
    }
  }
}

export default StyleSheet

