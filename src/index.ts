export { default as useTheme } from "./hooks/useTheme"
export { default as useMediaQuery } from "./hooks/useMediaQuery"
export { default as useGenerateThemeCSS } from "./hooks/useGenerateThemeCSS"
export { default as useGenerateTypographyCSS } from "./hooks/useGenerateTypographyCSS"

export { default as createTheme } from "./constructors/createTheme"
export { default as createBreakpoints } from "./constructors/createBreakpoints"

export { default as Hidden } from "./components/Hidden"
export { default as ThemeProvider } from "./components/Theme/ThemeProvider"

export { TypographyKey } from "./types/typography.types"
export { PaletteTextColorKey } from "./types/palette.types"

import makeStyles from "./constructors/makeStyles";

export default makeStyles