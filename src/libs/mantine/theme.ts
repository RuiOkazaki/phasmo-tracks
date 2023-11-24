'use client';

import { Select, createTheme } from '@mantine/core';

export const theme = createTheme({
  components: {
    Select: Select.extend({
      defaultProps: {
        clearable: true,
        searchable: true,
        nothingFoundMessage: '見つかりませんでした',
        placeholder: '値を選択してください',
      },
    }),
  },
});
