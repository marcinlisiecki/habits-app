import React, { FunctionComponent } from "react";

import { ThemeProvider } from "styled-components";
import mainTheme from "@app/theme/mainTheme";

const Providers: FunctionComponent = ({ children }) => {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
};

export default Providers;
