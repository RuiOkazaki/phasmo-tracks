'use client';

import { Button, Title } from '@mantine/core';
import { NextPage } from 'next';

const page: NextPage = () => {
  let intervalId: NodeJS.Timeout;

  // bpmを引数にして、実際の間隔を計算する関数
  const calcInterval = (bpm: number): number => {
    const interval = (60 / bpm) * 1000;
    return interval;
  };

  // 特定の間隔で足音を再生する関数
  const playFootsteps = (bpm: number) => {
    const interval = calcInterval(bpm);
    intervalId = setInterval(() => {
      const footsteps = new Audio('/sounds/footsteps.mp3');
      footsteps.play();
      footsteps.onended = () => {
        footsteps.src = '';
      };
    }, interval);
  };

  // 全ての音声を停止する関数
  const stopAllSounds = () => {
    clearInterval(intervalId);
  };

  return (
    <>
      <Title>phasmo-tracks</Title>
      <Button onClick={() => playFootsteps(115)}>足音を再生</Button>
      <Button onClick={stopAllSounds}>全ての音声を停止</Button>
    </>
  );
};

export default page;
