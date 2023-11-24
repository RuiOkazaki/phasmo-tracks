import { Select } from '@mantine/core';
import { memo } from 'react';

import type { FC } from 'react';

import { tagNames } from '../../constants';

type Props = {
  filter: string | null | undefined;
  setFilter: (value: string | null) => void;
};

const Presenter: FC<Props> = ({ filter, setFilter }) => {
  return (
    <Select
      label="フィルター"
      data={Object.values(tagNames)}
      value={filter ?? null}
      onChange={setFilter}
    />
  );
};

export const FilterSelect = memo(Presenter);
