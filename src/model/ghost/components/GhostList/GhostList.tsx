import { SimpleGrid } from '@mantine/core';
import { memo } from 'react';

import type { FC } from 'react';

import { Ghost } from '../../type';
import { GhostListItem } from '../GhostListItem';

type Props = {
  ghosts: Ghost[];
  filter: string;
};

const Presenter: FC<Props> = ({ ghosts, filter }) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      spacing={{ base: 'md', sm: 'lg' }}
      verticalSpacing={{ base: 'md', sm: 'lg' }}
    >
      {ghosts.map(({ params }) => (
        <GhostListItem key={params.id} ghost={params} filter={filter} />
      ))}
    </SimpleGrid>
  );
};

export const GhostList = memo(Presenter);
