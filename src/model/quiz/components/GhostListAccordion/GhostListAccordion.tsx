import { Accordion, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { memo } from 'react';

import type { FC } from 'react';

import { ghosts } from '@/model/ghost/classes/index';
import { GhostListItem } from '@/model/ghost/components/GhostListItem';

const Presenter: FC = () => {
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
