import * as Vue from "vue";
import getStyleElement from "./getStyleElement";

function generateStyleElement(
  css: string,
  dataMeta: string,
  className?: string,
  element?: Vue.Ref
): string | null {
  const styleEle = getStyleElement(dataMeta)
  const cssText = document.createTextNode(css);

  console.log(dataMeta, styleEle, styleEle?.getAttribute('data-meta'), 1)

  if (styleEle) {
    // styleEle.appendChild(cssText);

    return null;
  }

  console.log(dataMeta, '这里会执行？', 2)

  const styleElement = document.createElement("style");
  styleElement.setAttribute("type", "text/css");
  styleElement.setAttribute("data-make-styles", '');
  styleElement.setAttribute("data-meta", dataMeta);
  styleElement.appendChild(cssText);

  document.getElementsByTagName("head")[0].appendChild(styleElement);

  if (element?.value && className) {
    element.value.$el?.classList.add(className);
  }

  return dataMeta;
}

export default generateStyleElement;
