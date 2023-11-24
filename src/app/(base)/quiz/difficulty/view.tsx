import { Paper, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { memo } from 'react';

import type { FC } from 'react';

import { difficulties } from '@/model/quiz/constants/index';
import { DifficultyEnName } from '@/model/quiz/type/index';

const Presenter: FC = () => {
  return (
    <>
      <Title order={2}>難易度を選択</Title>
      {Object.keys(difficulties).map((key) => (
        <Paper
          key={key}
          href={`/quiz?difficulty=${key}`}
          component={Link}
          withBorder
          p={{ base: 'md', sm: 'xl' }}
          radius="md"
          style={{ color: 'inherit' }}
        >
          <Stack gap="xs">
            <Title order={3} fz="lg">
              {difficulties[key as DifficultyEnName]?.jaName ?? 'Unknown'}
            </Title>
            <Text
              c="dimmed"
              style={{
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}
              dangerouslySetInnerHTML={{
                __html: difficulties[key as DifficultyEnName]?.description,
              }}
            />
          </Stack>
        </Paper>
      ))}
    </>
  );
};

export const View = memo(Presenter);
