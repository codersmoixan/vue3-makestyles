// @ts-ignore
// tslint:disable-next-line:no-implicit-dependencies
import { createBreakpoints, createTheme } from "vue3-makestyles";

export const initialBreakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 15036,
  },
};

export const breakpoints = createBreakpoints(initialBreakpoints); // 初始化断点阙值

export const Primary = "#090909";
export const Secondary = "#808080";
export const Disabled = "#CECECE";
export const LightGreyBG = "#F8F9F9";
export const White = "#FFFFFF";
export const Transparent = "transparent";
export const Black = "#000";

export const FitLineBrandColorRed = "#CD0039";
export const FitLineBrandColorRed20 = "#F5CCD7";
export const FitLineBrandColorRedInteraction = "#B80033";

export const FitLineBrandColorPeach = "#FFF3E0";
export const FitLineBrandColorPeachSupport = "#FFFAF3";
export const FitLineBrandColorPeach20 = "RGBA(255, 243, 224, 0.2)";
export const FitLineBrandColorDarkPeach = "#F6D7A4";
export const FitLineButtonClickBackgroundColor = "#A4002D";
export const FitLineColorTestingDisabled = "#F2F2F7";
export const FitLineBrandColorSilver = "#A7A9AC";
export const FitLineSecondaryBlack = "#595959";
export const LinearBrandColor = "#F22F65";
export const FitLineSecondaryGrey = "#F2F2F7";
export const FitLineInteractionWhite = "#ECECEC";

export const Success = "#4CAF50";
export const Warning = "#BE1800";
export const WarningBG = "#FFE7E9";
export const Pending = "#E67E22";
export const Wechat = "#1AAD19";

export const SearchBgColor = "#FFF3E0";
export const SearchPlaceHolderColor = "#808080";
export const SearchHeight = 56;
export const transitionTime = "0.3s";
export const transition = `all ${transitionTime}`;
export const safaBottomBarHeight = "env(safe-area-inset-bottom)";
export const compatibleBottomBarHeight = (h = 72) =>
  `calc(${h}px + ${safaBottomBarHeight})`;

export default createTheme({
  breakpoints, // 媒体查询断点
  themeUnit: {
    step: 8, // theme.spacing(1) 1 = 8
    unit: "px", // css值单位， { width: 100, height: 100 } = { width: '100px', height: '100px' }
  },
  palette: { // 调色板
    primary: {
      main: FitLineBrandColorRed,
      white: White,
      disabled: Disabled,
      transparent: Transparent,
      black: Black,
      pending: Pending,
      success: Success,
      warning: Warning,
      peach: FitLineBrandColorPeach,
      darkPeach: FitLineBrandColorDarkPeach,
      silver: FitLineBrandColorSilver,
      linear: LinearBrandColor,
      primary: Primary,
      secondary: Secondary,
    },
    error: {
      main: Warning,
    },
    success: {
      main: Success,
    },
    divider: LightGreyBG,
    background: {
      main: FitLineBrandColorRed,
      disabled: LightGreyBG,
      white: White,
      grey: FitLineSecondaryGrey,
      secondary: Secondary,
    },
    // 次要的
    secondary: {
      main: FitLineBrandColorRedInteraction,
      black: FitLineSecondaryBlack,
      white: FitLineInteractionWhite,
      peach: FitLineBrandColorPeachSupport,
    },
    text: {
      main: FitLineBrandColorRed,
      primary: Primary,
      secondary: Secondary,
      white: White,
      disabled: FitLineBrandColorSilver,
      success: Success,
      danger: LinearBrandColor,
      warning: FitLineBrandColorDarkPeach,
    },
  },
  mixins: { // 通用
    toolbar: {
      minHeight: 48,
      appBarHeight: 64,
      compatibleHeight: compatibleBottomBarHeight,
      safaBottom: safaBottomBarHeight,
    },
    transitionTime,
    transition,
  },
  shape: {
    borderRadius: 8,
  },
  css: {} // 定义全局样式 覆盖组件样式
});
