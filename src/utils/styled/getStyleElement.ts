import { isEmpty } from "../helper";

export default function getStyleElement(meta: string): any {
  const styleElements = document.getElementsByTagName("style")

  if (isEmpty(styleElements)) {
    return null
  }

  let styleEle;
  for(let i = 0; i <= styleElements.length; i++) {
    const dataMeta = styleElements[i]?.getAttribute("data-meta")

    if (dataMeta === meta) {
      styleEle = styleElements[i]
    }
  }

  return styleEle
}
