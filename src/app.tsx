import React from "react";
import ReactDom from "react-dom";

import { ThemeProvider } from "styled-components";

import Routes from "./routes";

import PlayerProvider from "./contexts/player";

import { GlobalStyle } from "./styles/global";
import themes from "./themes";

declare class FontFace {
  constructor(name: string, path: string);
}

if (document.fonts) {
  const fontFace = new FontFace("Roboto", "./fonts/Roboto-Regular.ttf");
  document.fonts.add(fontFace);
}

const App = () => {
  return (
    <ThemeProvider theme={themes["dark"]}>
      <PlayerProvider>
        <Routes />
      </PlayerProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
