'use client';

import { useState, useCallback, useEffect } from 'react';

const BASE_TEMPO = 9.2 as const;

const loadFootstepsAudio = () => {
  const footsteps = new Audio('/sounds/footsteps.mp3');
  return footsteps;
};

const playAudio = (audio: HTMLAudioElement) => {
  audio.play();
  audio.onended = () => {
    audio.src = '';
  };
};

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

export const useFootsteps = () => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  // 全ての音声を停止する関数
  const stopSounds = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(undefined);
  }, [intervalId]);

  // 特定の間隔で足音を再生する関数
  const playSounds = useCallback(
    (speed: number, speedModifier = 1.0) => {
      if (speed < 0) return;

      // 音楽を一度停止しておく
      stopSounds();

      // 初回の足音を再生
      const footstepsAudio = loadFootstepsAudio();
      playAudio(footstepsAudio);

      // 一定間隔おきに足音を再生
      const interval = calcInterval(speed, speedModifier);
      const _intervalId = setInterval(() => {
        const footstepsAudio = loadFootstepsAudio();
        playAudio(footstepsAudio);
      }, interval);
      setIntervalId(_intervalId);
    },
    [stopSounds],
  );

  // 特定の時間のみ足音を再生する関数
  const playSoundsForThreeSeconds = useCallback(
    (speed: number, speedModifier = 1.0) => {
      playSounds(speed, speedModifier);

      if (timeoutId) clearTimeout(timeoutId);
      const _timeoutId = setTimeout(() => {
        stopSounds();
      }, 3 * 1000);
      setTimeoutId(_timeoutId);
    },
    [playSounds, stopSounds, timeoutId],
  );

  // クリーンアップ関数
  useEffect(() => {
    return () => {
      if (intervalId) stopSounds();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [intervalId, stopSounds, timeoutId]);

  return {
    playSounds,
    playSoundsForThreeSeconds,
    stopSounds,
  };
};
