import "styled-components";

interface ColorPalette {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface FontWeight {
  light: number;
  regular: number;
  medium: number;
  bold: number;
  extraBold: number;
  black: number;
}

interface FontFamily {
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface FontSize {
  fontSize: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      borderColors: {
        primary: string;
      };
      background: {
        primary: string;
        secondary: string;
      };
      primary: ColorPalette;
      gray: ColorPalette;
      success: ColorPalette;
      danger: ColorPalette;
      warning: ColorPalette;
      text: {
        primary: string;
        secondary: string;
        error: string;
        special: string;
      };
      base: {
        white: string;
        black: string;
      };
    };
    typography: {
      fontWeight: FontWeight;
      fontFamily: {
        Montserrat: FontFamily;
      };
      h1: FontSize;
      h2: FontSize;
      h3: FontSize;
      h4: FontSize;
      h5: FontSize;
      h6: FontSize;
      p: FontSize;
      p2: FontSize;
      p3: FontSize;
    };
  }
}
