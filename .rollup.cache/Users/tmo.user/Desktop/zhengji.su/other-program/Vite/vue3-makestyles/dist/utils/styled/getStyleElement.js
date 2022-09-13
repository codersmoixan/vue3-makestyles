import { isEmpty } from "../helper";
export default function getStyleElement(meta) {
    var styleElements = document.getElementsByTagName("styles");
    if (isEmpty(styleElements)) {
        return null;
    }
    var styleEle;
    for (var i = 0; i <= styleElements.length; i++) {
        var dataMeta = styleElements[i].getAttribute("data-meta");
        if (dataMeta === meta) {
            styleEle = styleElements[i];
        }
    }
    return styleEle;
}
//# sourceMappingURL=getStyleElement.js.map