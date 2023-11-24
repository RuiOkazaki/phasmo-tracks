import { Center, Paper, Stack } from '@mantine/core';
import '@mantine/core/styles.css';

export * from '@/libs/next/metadata';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center bg="gray.0" p="md" mih="calc(100dvh - 60px)">
      <Paper
        withBorder
        radius="md"
        p={{ base: 'lg', sm: 'xl' }}
        w="100%"
        maw={600}
      >
        <Stack>{children}</Stack>
      </Paper>
    </Center>
  );
};

export default Layout;
