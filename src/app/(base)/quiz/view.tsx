'use client';

import { Button, Group, Select, Stack, Title } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import type { FC } from 'react';

import { useFootsteps } from '@/model/footsteps/hooks';
import { ghosts } from '@/model/ghost/classes/index';
import { CalculateSpeedArgs } from '@/model/ghost/type';
import { CalculateSpeedForm } from '@/model/quiz/components/CalculateSpeedForm';
import { GhostListAccordion } from '@/model/quiz/components/GhostListAccordion/GhostListAccordion';
import { difficultiesNames } from '@/model/quiz/constants/index';
import { DifficultyEnName } from '@/model/quiz/type/index';

const Presenter: FC = () => {
  const searchParams = useSearchParams();
  const difficulty =
    (searchParams.get('difficulty') as DifficultyEnName) ?? 'amateur';

  const [calculateSpeedArgs, setCalculateSpeedArgs] =
    useSetState<CalculateSpeedArgs>({
      distance: 15,
      elapsedTime: 0,
      san: 100,
      temperature: 20,
      isElectronic: false,
      isLooking: false,
    });

  const { current: ghost } = useRef(
    ghosts[Math.floor(Math.random() * ghosts.length)],
  );
  const footstepsSpeed = useMemo(
    () => ghost?.calculateSpeed(calculateSpeedArgs),
    [calculateSpeedArgs, ghost],
  );

  const { playSounds, stopSounds } = useFootsteps();

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = useCallback(() => {
    if (!footstepsSpeed) return;

    if (!isPlaying) playSounds(footstepsSpeed);
    else stopSounds();
    setIsPlaying((prev) => !prev);
  }, [footstepsSpeed, isPlaying, playSounds, stopSounds]);

  return (
    <>
      <Title order={2}>難易度: {difficultiesNames[difficulty]}</Title>

      <CalculateSpeedForm
        difficulty={difficulty}
        calculateSpeedArgs={calculateSpeedArgs}
        setCalculateSpeedArgs={setCalculateSpeedArgs}
      />
      <GhostListAccordion />

      <Stack gap={8}>
        <Group gap={8} align="end" wrap="nowrap">
          <Select
            w="100%"
            placeholder="ゴーストの正体"
            data={ghosts.map((g) => g.params.jaName)}
          />
          <Button fullWidth variant="outline">
            回答する
          </Button>
        </Group>
        <Button
          onClick={handlePlay}
          leftSection={
            isPlaying ? (
              <IconPlayerStopFilled size={16} />
            ) : (
              <IconPlayerPlayFilled size={16} />
            )
          }
        >
          {isPlaying ? '足音を止める' : '足音を聞く'}
        </Button>
      </Stack>
    </>
  );
};

export const View = memo(Presenter);
