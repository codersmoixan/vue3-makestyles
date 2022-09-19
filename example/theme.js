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

export const breakpoints = createBreakpoints(initialBreakpoints);

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
  breakpoints: breakpoints,
  themeUnit: {
    step: 8,
    unit: "px",
  },
  palette: {
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
  typography: {
    fontFamily: [
      '"Clan Pro"',
      '"Helvetica Neue LT Pro"',
      '"Ping Fang SC"',
      '"SourceHanSansSC"',
      '"Noto Sans CJK SC"',
      '"Hiragino Sans GB"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      '"sans-serif"',
      '"STXihei"',
      '"华文细黑"',
      '"Heiti"',
      '"黑体"',
      '"冬青黑体简体中文"',
    ].join(","),
    color: {
      primary: FitLineBrandColorRed,
      secondary: Secondary,
      textPrimary: Primary,
      textSecondary: Secondary,
    },
    h1: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.5,
      [breakpoints.up("md")]: {
        fontSize: 32,
      },
    },
    h2: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.5,
      [breakpoints.up("md")]: {
        fontSize: "24px",
      },
    },
    h3: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.428,
    },
    h4: {
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 400,
      [breakpoints.up("md")]: {
        fontSize: "14px",
      },
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.428,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
    },
    content16: {
      fontSize: 16,
    },
    mask: {
      fontSize: 16,
    },
    minorContent: {
      fontSize: 12,
    },
    common24: {
      fontSize: 24,
      lineHeight: 1.147,
    },
  },
  mixins: {
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
});
