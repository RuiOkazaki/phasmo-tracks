'use client';

import { Title } from '@mantine/core';
import { NextPage } from 'next';

const page: NextPage = () => {
  // public/sounds/footsteps.mp3を再生する関数
  const playFootsteps = () => {
    const audio = new Audio('/sounds/footsteps.mp3');
    audio.play();
  };

  return (
    <>
      <Title>phasmo-tracks</Title>
      <button onClick={playFootsteps}>足音を再生</button>
    </>
  );
};

export default page;
