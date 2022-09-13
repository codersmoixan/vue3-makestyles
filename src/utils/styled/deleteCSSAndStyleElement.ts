type EleName = string | null;

function deleteCSSAndStyleElement(eleName: EleName, styleEleName: EleName) {
  if (!eleName || !styleEleName) return;

  const ele = document.querySelector(eleName);

  const styleEle = document.getElementById(styleEleName);
  const head = document.getElementsByTagName("head")[0];

  if (!ele && styleEle) {
    head.removeChild(styleEle);
  }
}

export default deleteCSSAndStyleElement;
