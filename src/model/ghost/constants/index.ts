import { Tags } from '../type';

export const tagNames = {
  temperature: '気温',
  distance: '距離',
  san: 'SAN値',
  electronic: '電子機器',
  looking: '認識',
  elapsedTime: '経過時間',
} as const;

export const tags: Tags = {
  temperature: {
    jaName: tagNames.temperature,
  },
  distance: {
    jaName: tagNames.distance,
  },
  san: {
    jaName: tagNames.san,
  },
  electronic: {
    jaName: tagNames.electronic,
  },
  looking: {
    jaName: tagNames.looking,
  },
  elapsedTime: {
    jaName: tagNames.elapsedTime,
  },
};

export const sortLabel = {
  maxSpeedAsc: '最大速度の昇順',
  maxSpeedDesc: '最大速度の降順',
  minSpeedAsc: '最小速度の昇順',
  minSpeedDesc: '最小速度の降順',
} as const;
