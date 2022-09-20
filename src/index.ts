export { default as useTheme } from "./hooks/useTheme"
export { default as useMediaQuery } from "./hooks/useMediaQuery"
export { default as useGenerateThemeCSS } from "./hooks/useGenerateThemeCSS"
export { default as useGenerateTypographyCSS } from "./hooks/useGenerateTypographyCSS"

export { default as createTheme } from "./constructors/createTheme"
export { default as createBreakpoints } from "./constructors/createBreakpoints"

export { default as Hidden } from "./components/Hidden"
export { default as ThemeProvider } from "./components/Theme/ThemeProvider"

export { TypographyKey } from "./types/typography.types"
export { Theme, ThemeOptions } from "./types/index.types"
export { BreakpointsKey, Breakpoints, BreakpointsOptions, BreakpointsValues } from "./types/breakpoints.types"
export { Spacing } from "./types/spacing.types"
export { ThemeUnitOptions } from "./types/themeUnit.types"
export { MixinsKey, MixinsOptions, Mixins } from "./types/mixins.types"

import makeStyles from "./constructors/makeStyles";

export default makeStyles
