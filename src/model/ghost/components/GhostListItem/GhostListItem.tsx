import {
  Badge,
  Button,
  Card,
  Group,
  Overlay,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { memo } from 'react';

import type { FC } from 'react';

import { useFootsteps } from '@/model/footsteps/hooks';
import { GhostParameter } from '@/model/ghost/type/index';

type Props = {
  ghost: GhostParameter;
  filter?: string;
  inAccordion?: boolean;
  hideTags?: boolean;
  hideDescription?: boolean;
  hideSpeed?: boolean;
  disablePlayFootsteps?: boolean;
  hideDetailButton?: boolean;
};

const Presenter: FC<Props> = ({
  ghost,
  filter,
  inAccordion = false,
  hideTags = false,
  hideDescription = false,
  hideSpeed = false,
  disablePlayFootsteps = false,
  hideDetailButton = false,
}) => {
  const { playSoundsForThreeSeconds } = useFootsteps();

  return (
    <Card
      shadow={inAccordion ? 'xs' : 'sm'}
      padding={inAccordion ? 'sm' : 'lg'}
      radius="md"
      withBorder
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between" align="center">
          <Title order={3} fz={inAccordion ? 'md' : '1.375rem'}>
            {ghost.jaName}
          </Title>
          <Group gap="xs" display={hideTags ? 'none' : undefined}>
            {ghost.tags.map((tag) => (
              <Badge
                key={tag.jaName}
                color="red"
                size={inAccordion ? 'md' : 'lg'}
              >
                {tag.jaName}
              </Badge>
            ))}
          </Group>
        </Group>
      </Card.Section>

      <Stack gap={inAccordion ? 'xs' : 'sm'} pt={inAccordion ? 'sm' : 'md'}>
        <Text
          size={inAccordion ? 'sm' : 'md'}
          c="dimmed"
          mih={
            inAccordion ? 'calc(0.875rem * 1.45 * 2)' : 'calc(1rem * 1.55 * 2)'
          }
          display={hideDescription ? 'none' : undefined}
        >
          {ghost.description}
        </Text>
        <Group gap="xs" wrap="nowrap" display={hideSpeed ? 'none' : undefined}>
          <Badge
            onClick={() => playSoundsForThreeSeconds(ghost.highSpeed)}
            component="button"
            styles={{
              root: {
                cursor:
                  ghost.highSpeed >= 0 && !disablePlayFootsteps
                    ? 'pointer'
                    : 'default',
              },
              label: {
                textTransform: 'none',
              },
            }}
            radius="xs"
            size={inAccordion ? 'sm' : 'lg'}
            color="blue"
            disabled={ghost.highSpeed < 0 || disablePlayFootsteps}
            variant="dot"
          >
            Max:
            {ghost.highSpeed}
            m/s
          </Badge>
          <Badge
            onClick={() => playSoundsForThreeSeconds(ghost.lowSpeed)}
            component="button"
            styles={{
              root: {
                cursor:
                  ghost.lowSpeed >= 0 && !disablePlayFootsteps
                    ? 'pointer'
                    : 'default',
              },
              label: {
                textTransform: 'none',
              },
            }}
            radius="xs"
            size={inAccordion ? 'sm' : 'lg'}
            color="green"
            disabled={ghost.lowSpeed < 0 || disablePlayFootsteps}
            variant="dot"
          >
            Min:
            {ghost.lowSpeed}
            m/s
          </Badge>
        </Group>
        <Button
          component={Link}
          target="_blank"
          href={`https://phasmophobia.fandom.com/wiki/${ghost.enName}`}
          variant="light"
          color="blue"
          fullWidth
          radius="md"
          size={inAccordion ? 'xs' : 'sm'}
          display={hideDetailButton ? 'none' : undefined}
        >
          詳細を見る
        </Button>
      </Stack>

      {filter && !ghost.tags.some((tag) => tag.jaName === filter) && (
        <Overlay />
      )}
    </Card>
  );
};

export const GhostListItem = memo(Presenter);
