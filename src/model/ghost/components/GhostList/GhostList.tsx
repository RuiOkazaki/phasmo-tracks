import {
  Badge,
  Button,
  Card,
  Group,
  Overlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { memo } from 'react';

import type { FC } from 'react';

import { useFootsteps } from '@/model/footsteps/hooks';

import { Ghost } from '../../type';

type Props = {
  ghosts: Ghost[];
  filter: string;
};

const Presenter: FC<Props> = ({ ghosts, filter }) => {
  const { playSoundsForThreeSeconds } = useFootsteps();

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      spacing={{ base: 'md', sm: 'lg' }}
      verticalSpacing={{ base: 'md', sm: 'lg' }}
    >
      {ghosts.map(({ params }) => (
        <Card key={params.id} shadow="sm" padding="lg" radius="md" withBorder>
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
                onClick={() => playSoundsForThreeSeconds(params.highSpeed)}
                component="button"
                styles={{
                  root: {
                    cursor: params.highSpeed >= 0 ? 'pointer' : 'default',
                  },
                  label: {
                    textTransform: 'none',
                  },
                }}
                radius="xs"
                size="lg"
                color="blue"
                disabled={params.highSpeed < 0}
                variant="dot"
              >
                Max:
                {params.highSpeed}
                m/s
              </Badge>
              <Badge
                onClick={() => playSoundsForThreeSeconds(params.lowSpeed)}
                component="button"
                styles={{
                  root: {
                    cursor: params.lowSpeed >= 0 ? 'pointer' : 'default',
                  },
                  label: {
                    textTransform: 'none',
                  },
                }}
                radius="xs"
                size="lg"
                color="green"
                disabled={params.lowSpeed < 0}
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
  );
};

export const GhostList = memo(Presenter);
