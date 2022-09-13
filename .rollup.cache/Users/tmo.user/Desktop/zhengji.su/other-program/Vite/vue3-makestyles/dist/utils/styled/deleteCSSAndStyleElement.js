function deleteCSSAndStyleElement(eleName, styleEleName) {
    if (!eleName || !styleEleName)
        return;
    var ele = document.querySelector(eleName);
    var styleEle = document.getElementById(styleEleName);
    var head = document.getElementsByTagName("head")[0];
    if (!ele && styleEle) {
        head.removeChild(styleEle);
    }
}
export default deleteCSSAndStyleElement;
//# sourceMappingURL=deleteCSSAndStyleElement.js.map