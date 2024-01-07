import { UnistylesRegistry } from 'react-native-unistyles';

import { lightTheme } from '@/theme';

const breakpoints = {
  xs: 0,
};

export const initializeUnistyles = () => {
  UnistylesRegistry.addBreakpoints(breakpoints).addThemes({
    light: lightTheme,
  });
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
