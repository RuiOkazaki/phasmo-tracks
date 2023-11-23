import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';

import { theme } from './theme';

type Props = {
  children: ReactNode;
};

export const CustomMantineProvider: FC<Props> = ({ children }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);
