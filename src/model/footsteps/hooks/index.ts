'use client';

import { useState, useCallback, useEffect } from 'react';

const BASE_TEMPO = 9.2 as const;

const loadFootstepsAudio = () => {
  const footsteps = new Audio('/sounds/footsteps.mp3');
  return footsteps;
};

//オーディオインスタンス
const footstepsAudio = loadFootstepsAudio();

const playAudio = (audio: HTMLAudioElement) => {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0; //タイム0
  }
  audio.play();
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
  const [now, setNow] = useState<Date>();
  const [stopTime, setStopTime] = useState<Date>();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 全ての音声を停止する関数
  const stopSounds = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setStopTime(undefined);
  }, [intervalId]);

  // 特定の間隔で足音を再生する関数
  const playSounds = useCallback((speed: number, speedModifier = 1.0) => {
    if (speed < 0) return;
    // 新しい音を再生する前に前の音を停止
    footstepsAudio.pause();
    footstepsAudio.currentTime = 0;

    // 一定間隔おきに足音を再生
    const interval = calcInterval(speed, speedModifier);
    const _intervalId = setInterval(() => {
      playAudio(footstepsAudio); // オーディオインスタンスを再利用
    }, interval);
    setIntervalId(_intervalId);
  }, []);

  const playSoundsForThreeSeconds = useCallback(
    (speed: number, speedModifier = 1.0) => {
      if (stopTime) stopSounds();

      playSounds(speed, speedModifier);
      // 3秒後に足音を停止
      const _stopTime = new Date();
      _stopTime.setSeconds(_stopTime.getSeconds() + 3);
      setStopTime(_stopTime);
    },
    [playSounds, stopSounds, stopTime],
  );

  // フレームごとに現在時刻を更新
  if (isClient) {
    requestAnimationFrame(() => {
      setNow(new Date());
      if (stopTime && now && stopTime.getTime() < now.getTime()) stopSounds();
    });
  }

  return {
    playSounds,
    playSoundsForThreeSeconds,
    stopSounds,
  };
};
