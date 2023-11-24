import { Accordion, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { memo } from 'react';

import type { FC } from 'react';

import { ghosts } from '@/model/ghost/classes/index';
import { GhostListItem } from '@/model/ghost/components/GhostListItem';
import { DifficultyEnName } from '@/model/quiz/type/index';

type Props = {
  difficulty: DifficultyEnName;
};

const Presenter: FC<Props> = ({ difficulty }) => {
  if (difficulty === 'professional' || difficulty === 'nightmare') return null;

  return (
    <Accordion variant="separated">
      <Accordion.Item value="ghost-list">
        <Accordion.Control>
          <Text fz="sm" fw="bold">
            ゴースト一覧
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <ScrollArea h={300}>
            <SimpleGrid cols={{ base: 1, xs: 2 }}>
              {ghosts.map(({ params }) => (
                <GhostListItem
                  hideDescription={difficulty !== 'amateur'}
                  hideDetailButton={difficulty !== 'amateur'}
                  disablePlayFootsteps
                  inAccordion
                  key={params.id}
                  ghost={params}
                />
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export const GhostListAccordion = memo(Presenter);
