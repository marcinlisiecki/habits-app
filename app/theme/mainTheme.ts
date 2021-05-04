const colors = {
  borderColors: {
    primary: 'rgba(255, 255, 255, .1)',
  },
  primary: {
    100: '#AEEECF',
    200: '#93E8BF',
    300: '#78E2AF',
    400: '#5DDD9F',
    500: '#40D68D',
    600: '#2AC67B',
    700: '#23A566',
    800: '#1C8452',
    900: '#15633D',
  },
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  success: {
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  danger: {
    100: '#F2A6A6',
    200: '#F09999',
    300: '#ED7F7F',
    400: '#E96666',
    500: '#E64C4C',
    600: '#E02626',
    700: '#BF1B1B',
    800: '#991616',
    900: '#731010',
  },
  warning: {
    100: '#FEF9C3',
    200: '#FEF08A',
    300: '#FDE047',
    400: '#FACC15',
    500: '#EAB308',
    600: '#CA8A04',
    700: '#A16207',
    800: '#854D0E',
    900: '#713F12',
  },
  text: {
    primary: '#fff',
    secondary: '#aeaeae',
    tertiary: 'rgba(174,174,174,0.56)',
    error: '#E64C4C',
    success: '#4ADE80',
    warning: '#FACC15',
    special: '#4ADE80',
    black: '#000',
  },
  background: {
    primary: '#0B0E11',
    secondary: '#0D1117',
  },
  base: {
    white: '#fff',
    black: '#000',
  },
};

const typography = {
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 600,
    extraBold: 700,
    black: 800,
  },
  fontFamily: {
    Montserrat: {
      300: 'Montserrat_300Light',
      400: 'Montserrat_400Regular',
      500: 'Montserrat_500Medium',
      600: 'Montserrat_600SemiBold',
      700: 'Montserrat_700Bold',
      800: 'Montserrat_800ExtraBold',
      900: 'Montserrat_900Black',
    },
  },
  h1: {
    fontSize: '55px',
  },
  h2: {
    fontSize: '40px',
  },
  h3: {
    fontSize: '27px',
  },
  h4: {
    fontSize: '21px',
  },
  h5: {
    fontSize: '18px',
  },
  h6: {
    fontSize: '16px',
  },
  p: {
    fontSize: '14px',
  },
  p2: {
    fontSize: '12px',
  },
  p3: {
    fontSize: '10px',
  },
};

export default {
  typography,
  colors,
};
