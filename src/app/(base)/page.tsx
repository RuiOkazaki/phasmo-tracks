'use client';

import {
  Badge,
  Button,
  Card,
  Group,
  Overlay,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ghosts } from '@/model/ghost/classes';
import { tagNames, sortLabel } from '@/model/ghost/constants/index';

const Page: NextPage = () => {
  const [filter, setFilter] = useState<string | null>();
  const [sort, setSort] = useState<string | null>();

  const sortedGhosts = useMemo(() => {
    if (sort === null) return ghosts;

    return ghosts.toSorted((a, b) => {
      if (sort === sortLabel.maxSpeedAsc) {
        return a.params.highSpeed - b.params.highSpeed;
      }
      if (sort === sortLabel.maxSpeedDesc) {
        return b.params.highSpeed - a.params.highSpeed;
      }
      if (sort === sortLabel.minSpeedAsc) {
        return a.params.lowSpeed - b.params.lowSpeed;
      }
      if (sort === sortLabel.minSpeedDesc) {
        return b.params.lowSpeed - a.params.lowSpeed;
      }
      return 0;
    });
  }, [sort]);

  return (
    <>
      <Stack>
        <Group align="center" justify="space-between">
          <Title order={2}>足の速さで特定出来るゴースト一覧</Title>
          <Group>
            <Select
              label="ソート"
              placeholder="値を選択してください"
              data={[
                {
                  group: '最大速度',
                  items: [sortLabel.maxSpeedAsc, sortLabel.maxSpeedDesc],
                },
                {
                  group: '最小速度',
                  items: [sortLabel.minSpeedAsc, sortLabel.minSpeedDesc],
                },
              ]}
              value={sort ?? null}
              onChange={setSort}
              clearable
              searchable
              nothingFoundMessage="見つかりませんでした"
            />
            <Select
              label="フィルター"
              placeholder="値を選択してください"
              data={Object.values(tagNames)}
              value={filter ?? null}
              onChange={setFilter}
              clearable
              searchable
              nothingFoundMessage="見つかりませんでした"
            />
          </Group>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          spacing={{ base: 'md', sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'lg' }}
        >
          {sortedGhosts.map(({ params }) => (
            <Card
              key={params.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between" align="center">
                  <Title order={3}>{params.jaName}</Title>
                  <Group gap="xs">
                    {params.tags.map((tag) => (
                      <Badge key={tag.jaName} color="red" size="lg">
                        {tag.jaName}
                      </Badge>
                    ))}
                  </Group>
                </Group>
              </Card.Section>

              <Stack gap="sm" pt="md">
                <Text size="md" c="dimmed" mih={'calc(1rem * 1.55 * 2)'}>
                  {params.description}
                </Text>
                <Group gap="xs">
                  <Badge
                    onClick={() => {
                      console.log(`${params.jaName}のhighSpeedの足音を鳴らす`);
                    }}
                    component="button"
                    styles={{
                      root: {
                        cursor: 'pointer',
                      },
                      label: {
                        textTransform: 'none',
                      },
                    }}
                    radius="xs"
                    size="lg"
                    color="blue"
                    variant="dot"
                  >
                    Max:
                    {params.highSpeed}
                    m/s
                  </Badge>
                  <Badge
                    onClick={() => {
                      console.log(`${params.jaName}のlowSpeedの足音を鳴らす`);
                    }}
                    component="button"
                    styles={{
                      root: {
                        cursor: 'pointer',
                      },
                      label: {
                        textTransform: 'none',
                      },
                    }}
                    radius="xs"
                    size="lg"
                    color="green"
                    variant="dot"
                  >
                    Min:
                    {params.lowSpeed}
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

              {filter && !params.tags.some((tag) => tag.jaName === filter) && (
                <Overlay />
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Page;
