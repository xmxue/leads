'use client';

import cx from 'clsx';
import {  Container, MantineProvider, createTheme } from '@mantine/core';
import classes from './theme-provider.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

export function ThemeProvider({children}: { children: React.ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}