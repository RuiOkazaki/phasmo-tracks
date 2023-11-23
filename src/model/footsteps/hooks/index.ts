'use client';

import { useState, useCallback, useEffect } from 'react';

const BASE_TEMPO = 9.2 as const;

export const useFootsteps = () => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

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

    const footsteps = new Audio('/sounds/footsteps.mp3');
    footsteps.play();
    footsteps.onended = () => {
      footsteps.src = '';
    };

    const interval = calcInterval(speed, speedModifier);
    const _intervalId = setInterval(() => {
      const footsteps = new Audio('/sounds/footsteps.mp3');
      footsteps.play();
      footsteps.onended = () => {
        footsteps.src = '';
      };
    }, interval);
    setIntervalId(_intervalId);
  };

  // 特定の時間のみ足音を再生する関数
  const playFootstepsForThreeSeconds = (speed: number, speedModifier = 1.0) => {
    playFootsteps(speed, speedModifier);

    if (timeoutId) clearTimeout(timeoutId);
    const _timeoutId = setTimeout(() => {
      stopSounds();
    }, 3 * 1000);
    setTimeoutId(_timeoutId);
  };

  useEffect(() => {
    return () => {
      if (intervalId) stopSounds();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [intervalId, stopSounds, timeoutId]);

  return {
    playFootsteps,
    playFootstepsForThreeSeconds,
    stopSounds,
  };
};
