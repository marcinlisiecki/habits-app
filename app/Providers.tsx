import React, { FunctionComponent } from 'react';

import { ThemeProvider } from 'styled-components';
import mainTheme from '@app/theme/mainTheme';
import { UserProvider } from '@app/context/UserContext';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const Providers: FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
