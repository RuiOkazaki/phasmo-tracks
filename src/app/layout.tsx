import { Box, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';

import { CustomMantineProvider } from '@/libs/mantine/provider';
import { LINESeedJP } from '@/libs/next-font/lineSeedJp';

export * from '@/libs/next/metadata';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={LINESeedJP.className}>
        <CustomMantineProvider>
          <Box h={'100dvh'}>
            <Box component="main" px={'md'}>
              {children}
            </Box>
          </Box>
        </CustomMantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
