import { Select } from '@mantine/core';
import { memo } from 'react';

import type { FC } from 'react';

import { sortLabel } from '@/model/ghost/constants';

type Props = {
  sort: string | null | undefined;
  setSort: (value: string | null) => void;
};

const Presenter: FC<Props> = ({ sort, setSort }) => {
  return (
    <Select
      label="ソート"
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
    />
  );
};

export const SortSelect = memo(Presenter);
