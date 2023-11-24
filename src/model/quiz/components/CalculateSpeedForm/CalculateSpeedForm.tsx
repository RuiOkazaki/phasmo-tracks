import { Checkbox, SimpleGrid, Slider, Stack, Text } from '@mantine/core';
import { memo } from 'react';

import type { FC } from 'react';

import { CalculateSpeedArgs } from '@/model/ghost/type';
import { DifficultyEnName } from '@/model/quiz/type/index';

type Props = {
  calculateSpeedArgs: CalculateSpeedArgs;
  setCalculateSpeedArgs: (
    statePartial:
      | Partial<CalculateSpeedArgs>
      | ((currentState: CalculateSpeedArgs) => Partial<CalculateSpeedArgs>),
  ) => void;
  difficulty: DifficultyEnName;
};

const Presenter: FC<Props> = ({
  calculateSpeedArgs,
  setCalculateSpeedArgs,
  difficulty,
}) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="md">
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
          step={1}
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
          value={calculateSpeedArgs.temperature}
          onChange={(value) => setCalculateSpeedArgs({ temperature: value })}
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
  );
};

export const CalculateSpeedForm = memo(Presenter);
