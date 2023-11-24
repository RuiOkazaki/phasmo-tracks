'use client';

import {
  Button,
  Checkbox,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { memo, useState } from 'react';

import type { FC } from 'react';

import { difficultiesNames } from '@/model/quiz/constants/index';
import { DifficultyEnName } from '@/model/quiz/type/index';

const Presenter: FC = () => {
  const searchParams = useSearchParams();
  const difficulty =
    (searchParams.get('difficulty') as DifficultyEnName) ?? 'amateur';

  const [calculateSpeedArgs, setCalculateSpeedArgs] = useSetState({
    distance: 15,
    elapsedTime: 0,
    san: 100,
    temperature: 20,
    isElectronic: false,
    isLooking: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <>
      <Title order={2}>難易度: {difficultiesNames[difficulty]}</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Stack gap="2">
          <Text fz="md">ゴーストとの距離(m)</Text>
          <Slider
            mb="lg"
            label={(n) => `${n}m`}
            value={calculateSpeedArgs.distance}
            onChange={(value) => setCalculateSpeedArgs({ distance: value })}
            step={0.5}
            size="lg"
            marks={[
              { value: 0, label: '0m' },
              { value: 2.5 },
              { value: 3 },
              { value: 12 },
              { value: 15, label: '15m' },
            ]}
            min={0}
            max={15}
          />
        </Stack>
        <Stack gap="2">
          <Text fz="md">経過時間(分)</Text>
          <Slider
            mb="lg"
            label={(n) => `${n}分`}
            value={calculateSpeedArgs.elapsedTime}
            onChange={(value) => setCalculateSpeedArgs({ elapsedTime: value })}
            size="lg"
            step={2}
            marks={[
              { value: 0, label: '0分' },
              { value: 10 },
              { value: 20, label: '20分' },
            ]}
            min={0}
            max={20}
          />
        </Stack>
        <Stack gap="2">
          <Text fz="md">SAN値(%)</Text>
          <Slider
            mb="lg"
            label={(n) => `${n}%`}
            value={calculateSpeedArgs.san}
            onChange={(value) => setCalculateSpeedArgs({ san: value })}
            size="lg"
            step={5}
            marks={[
              { value: 0, label: '0%' },
              { value: 5 },
              { value: 45 },
              { value: 100, label: '100%' },
            ]}
            min={0}
            max={100}
          />
        </Stack>
        <Stack gap="2">
          <Text fz="md">気温(℃)</Text>
          <Slider
            mb="lg"
            label={(n) => `${n}℃`}
            value={calculateSpeedArgs.san}
            onChange={(value) => setCalculateSpeedArgs({ san: value })}
            size="lg"
            step={5}
            marks={[
              { value: -5, label: '-5℃' },
              { value: 0 },
              { value: 15 },
              { value: 20, label: '20℃' },
            ]}
            min={-5}
            max={20}
          />
        </Stack>
        <Stack gap="2">
          <Checkbox
            checked={calculateSpeedArgs.isElectronic}
            onChange={() =>
              setCalculateSpeedArgs(({ isElectronic }) => ({
                isElectronic: !isElectronic,
              }))
            }
            label={<Text fz="md">近くに電子機器がある(6m)</Text>}
          />
        </Stack>
        <Stack gap="2">
          <Checkbox
            checked={calculateSpeedArgs.isLooking}
            onChange={() =>
              setCalculateSpeedArgs(({ isLooking }) => ({
                isLooking: !isLooking,
              }))
            }
            label={<Text fz="md">幽霊に視認されている</Text>}
          />
        </Stack>
      </SimpleGrid>
      <Button
        onClick={handlePlay}
        size="lg"
        leftSection={
          isPlaying ? <IconPlayerStopFilled /> : <IconPlayerPlayFilled />
        }
      >
        {isPlaying ? '足音を止める' : '足音を聞く'}
      </Button>
    </>
  );
};

export const View = memo(Presenter);
