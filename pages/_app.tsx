import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import FacebookPixel from "../components/FacebookPixel";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <FacebookPixel>
        <Component {...pageProps} />;
      </FacebookPixel>
    </ThemeProvider>
  );
}

export default MyApp;
