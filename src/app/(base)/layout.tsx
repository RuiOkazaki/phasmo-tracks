'use client';

import { AppShell, Title } from '@mantine/core';
import '@mantine/core/styles.css';

export * from '@/libs/next/metadata';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title>Phasmo Tracks</Title>
      </AppShell.Header>
      <AppShell.Main
        style={{
          padding: 0,
          paddingTop: 60,
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
