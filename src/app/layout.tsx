import { ColorSchemeScript } from '@mantine/core';
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
          <main>{children}</main>
        </CustomMantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
