'use client';

import {
  Button,
  Divider,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import type { FC } from 'react';

import { useFootsteps } from '@/model/footsteps/hooks';
import { ghosts } from '@/model/ghost/classes/index';
import { CalculateSpeedArgs, Ghost } from '@/model/ghost/type';
import { CalculateSpeedForm } from '@/model/quiz/components/CalculateSpeedForm';
import { GhostListAccordion } from '@/model/quiz/components/GhostListAccordion/GhostListAccordion';
import { difficultiesNames } from '@/model/quiz/constants/index';
import { DifficultyEnName } from '@/model/quiz/type/index';

const CALCULATE_SPEED_ARGS_DEFAULT: CalculateSpeedArgs = {
  distance: 15,
  elapsedTime: 0,
  san: 100,
  temperature: 20,
  isElectronic: false,
  isLooking: false,
  randomSeedDate: new Date(),
};

const Presenter: FC = () => {
  const searchParams = useSearchParams();
  const difficulty =
    (searchParams.get('difficulty') as DifficultyEnName) ?? 'amateur';

  const [calculateSpeedArgs, setCalculateSpeedArgs] =
    useSetState<CalculateSpeedArgs>(CALCULATE_SPEED_ARGS_DEFAULT);

  const ghostRef = useRef(ghosts[Math.floor(Math.random() * ghosts.length)]);

  const footstepsSpeed = useMemo(
    () => ghostRef.current?.calculateSpeed(calculateSpeedArgs),
    [calculateSpeedArgs, ghostRef],
  );

  const { playSounds, stopSounds } = useFootsteps();

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = useCallback(() => {
    if (!footstepsSpeed) return;

    // MEMO: ツインズの足音をランダムにするために、randomSeedDateを更新する
    setCalculateSpeedArgs({ randomSeedDate: new Date() });

    if (!isPlaying) playSounds(footstepsSpeed);
    else stopSounds();
    setIsPlaying((prev) => !prev);
  }, [
    footstepsSpeed,
    isPlaying,
    playSounds,
    setCalculateSpeedArgs,
    stopSounds,
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedGhost, setSelectedGhost] = useState<Ghost>();
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = useCallback((value: string | null) => {
    setSelectedGhost(ghosts.find((g) => g.params.jaName === value));
  }, []);

  const handleOpen = useCallback(() => {
    if (!selectedGhost) return;
    setIsAnswered(true);
    open();
  }, [open, selectedGhost]);

  const handleNext = useCallback(() => {
    setCalculateSpeedArgs(CALCULATE_SPEED_ARGS_DEFAULT);
    setSelectedGhost(undefined);
    setIsAnswered(false);
    close();

    // MEMO: closeのアニメーション(200ms)後にghostRef.currentを更新しないと答えが見えてしまう
    setTimeout(() => {
      ghostRef.current = ghosts[Math.floor(Math.random() * ghosts.length)];
    }, 200);
  }, [close, setCalculateSpeedArgs]);

  return (
    <>
      <Title order={2}>難易度: {difficultiesNames[difficulty]}</Title>

      <CalculateSpeedForm
        difficulty={difficulty}
        calculateSpeedArgs={calculateSpeedArgs}
        setCalculateSpeedArgs={setCalculateSpeedArgs}
      />
      <GhostListAccordion difficulty={difficulty} />

      <Stack gap={8}>
        <Group gap={8} align="end" wrap="nowrap">
          <Select
            w="100%"
            placeholder="ゴーストの正体"
            data={ghosts.map((g) => g.params.jaName)}
            onChange={handleSelect}
            value={selectedGhost?.params.jaName ?? null}
            disabled={isAnswered}
          />
          <Button
            onClick={handleOpen}
            fullWidth
            variant="outline"
            disabled={!selectedGhost}
          >
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
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        size={400}
      >
        <Stack>
          <Group justify="space-between" pos="relative">
            <Text fw="bold">ゴーストの正体を判明</Text>
            <Text fw="bold">
              {selectedGhost?.params.id === ghostRef.current?.params.id
                ? 100
                : 0}
              $
            </Text>
            {selectedGhost?.params.id !== ghostRef.current?.params.id && (
              <Divider
                pos="absolute"
                size="lg"
                top="50%"
                w="100%"
                color="black"
                style={{ transform: 'translateY(-70%)' }}
              />
            )}
          </Group>
          <Group gap={4} justify="space-between">
            <Button variant="light" color="black" onClick={close}>
              スキップ
            </Button>
            <Text fw="bold">
              ゴーストの正体：{ghostRef.current?.params.jaName}
            </Text>
            <Button variant="light" color="black" onClick={handleNext}>
              次
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export const View = memo(Presenter);
