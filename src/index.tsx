import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/styled-engine";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import theme from "./theme";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "img[alt]": {
            fontSize: ".75rem",
          },
          "*": {
            scrollbarWidth: "thin",
          },
          "*::-webkit-scrollbar": {
            "&,&-thumb": {
              width: "4px",
              height: "6px",
            },
            "&-thumb": {
              background: "#ccc",
            },
          },

          "::selection": {
            backgroundColor: "#0b52a2",
            color: "white",
          },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
