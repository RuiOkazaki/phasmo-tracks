'use client';

import { Stack, Group, Title } from '@mantine/core';
import { memo, useMemo, useState } from 'react';

import type { FC } from 'react';

import { ghosts } from '@/model/ghost/classes';
import { FilterSelect } from '@/model/ghost/components/FilterSelect';
import { GhostList } from '@/model/ghost/components/GhostList';
import { SortSelect } from '@/model/ghost/components/SortSelect/SortSelect';
import { sortLabel } from '@/model/ghost/constants';

const Presenter: FC = () => {
  const [filter, setFilter] = useState<string | null>();
  const [sort, setSort] = useState<string | null>();

  const sortedGhosts = useMemo(() => {
    if (sort === null) return ghosts;

    // TODO: https://github.com/vercel/next.js/pull/58421
    return [...ghosts].sort((a, b) => {
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
            <SortSelect sort={sort} setSort={setSort} />
            <FilterSelect filter={filter} setFilter={setFilter} />
          </Group>
        </Group>

        <GhostList ghosts={sortedGhosts} filter={filter ?? ''} />
      </Stack>
    </>
  );
};

export const View = memo(Presenter);
