'use client';

import { ActionIcon, Button, createTheme } from '@mantine/core';

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 'lg',
        color: 'gray',
        fw: 'bold',
        variant: 'subtle',
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        radius: 'lg',
        color: 'gray',
      },
    }),
  },
});
