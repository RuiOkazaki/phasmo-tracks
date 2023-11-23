'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';

import { ghosts } from '@/model/ghost/classes';

const Page: NextPage = () => {
  return (
    <>
      <Box>
        <Text>Ghosts</Text>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 'md', sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
        >
          {ghosts.map(({ params }) => (
            <Card
              key={params.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                  <Title order={3}>{params.jpName}</Title>
                  <Badge color="pink" variant="light">
                    On Sale
                  </Badge>
                </Group>
              </Card.Section>
              <Stack gap="sm" pt="md">
                <Text size="sm" c="dimmed">
                  {params.description}
                </Text>
                <Group gap="xs">
                  <Badge
                    styles={{
                      label: {
                        textTransform: 'none',
                      },
                    }}
                    radius="xs"
                    size="md"
                    color="green"
                    variant="dot"
                  >
                    Min:
                    {params.lowSpeed}
                    m/s
                  </Badge>
                  <Badge
                    styles={{
                      label: {
                        textTransform: 'none',
                      },
                    }}
                    radius="xs"
                    size="md"
                    color="blue"
                    variant="dot"
                  >
                    Max:
                    {params.highSpeed}
                    m/s
                  </Badge>
                </Group>
                <Button
                  component={Link}
                  target="_blank"
                  href={`https://phasmophobia.fandom.com/wiki/${params.enName}`}
                  variant="light"
                  color="blue"
                  fullWidth
                  radius="md"
                >
                  詳細を見る
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Page;
