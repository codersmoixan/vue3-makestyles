import getStyleElement from "./getStyleElement";
function generateStyleElement(css, dataMeta, className, element) {
    var _a;
    var styleEle = getStyleElement(dataMeta);
    var cssText = document.createTextNode(css);
    if (styleEle) {
        // styleEle.appendChild(cssText);
        return null;
    }
    var styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    styleElement.setAttribute("data-make-styles", '');
    styleElement.setAttribute("data-meta", dataMeta);
    styleElement.appendChild(cssText);
    document.getElementsByTagName("head")[0].appendChild(styleElement);
    if ((element === null || element === void 0 ? void 0 : element.value) && className) {
        (_a = element.value.$el) === null || _a === void 0 ? void 0 : _a.classList.add(className);
    }
    return dataMeta;
}
export default generateStyleElement;
//# sourceMappingURL=generateStyleElement.js.map