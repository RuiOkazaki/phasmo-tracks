'use client';

import { Button, Slider, Title } from '@mantine/core';
import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

const BASE_TEMPO = 9.2 as const;

const Page: NextPage = () => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [volume, setVolume] = useState<number>(50);

  // 足音の間隔を計算する関数
  const calcInterval = (speed: number, speedModifier = 1.0): number => {
    const tempo = Math.ceil(
      (BASE_TEMPO * Math.pow(speed, 2) +
        (BASE_TEMPO / 2) * 10 * speed +
        BASE_TEMPO) *
        speedModifier,
    );
    const interval = 1000 / (tempo / 60);
    return interval;
  };

  // 全ての音声を停止する関数
  const stopSounds = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(undefined);
  }, [intervalId]);

  // 特定の間隔で足音を再生する関数
  const playFootsteps = (speed: number, speedModifier = 1.0) => {
    if (intervalId) stopSounds();

    const interval = calcInterval(speed, speedModifier);
    const _intervalId = setInterval(() => {
      const footsteps = new Audio('/sounds/footsteps.mp3');
      footsteps.volume = volume / 100;
      footsteps.play();
      footsteps.onended = () => {
        footsteps.src = '';
      };
    }, interval);
    setIntervalId(_intervalId);
  };

  useEffect(() => {
    return () => {
      if (intervalId) stopSounds();
    };
  }, [intervalId, stopSounds]);

  return (
    <>
      <Title>phasmo-tracks</Title>
      <Slider value={volume} onChange={setVolume} />
      <Button onClick={() => playFootsteps(2.5)}>足音を再生</Button>
      <Button onClick={stopSounds}>全ての音声を停止</Button>
    </>
  );
};

export default Page;
