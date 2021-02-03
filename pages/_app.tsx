import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  console.log("theme", theme);
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
