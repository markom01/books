import { CSSProperties } from "@emotion/serialize";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      success: CSSProperties["color"];
    };
  }
  interface ThemeOptions {
    status?: {
      success?: CSSProperties["color"];
    };
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#0b52a2",
    },
    secondary: {
      main: "#002b73",
    },
  },
  status: { success: "#60bb46" },
});

theme = responsiveFontSizes(theme);

export default theme;
