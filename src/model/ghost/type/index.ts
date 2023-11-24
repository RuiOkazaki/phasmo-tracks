import { tagNames } from '../constants';

export type GhostParameter = {
  id: number;
  enName: string;
  jaName: string;
  description: string;
  lowSpeed: number;
  highSpeed: number;
  tags: Tag[];
};

// calculateSpeedの引数
export type CalculateSpeedArgs = {
  // プレイヤーとの距離(m)
  distance: number;
  // プレイヤーを見ているかどうか
  isLooking: boolean;
  // 気温
  temperature: number;
  // 近くに電源が入っている電子機器があるかどうか
  isElectronic: boolean;
  // SAN値
  san: number;
  // 開始してからの経過時間(分)
  elapsedTime: number;
  // ランダムな計算に使うDateオブジェクト
  randomSeedDate: Date;
};

export { Ghost } from '../classes';

export type TagJaName = (typeof tagNames)[keyof typeof tagNames];

export type Tag = {
  jaName: TagJaName;
};

export type Tags = {
  [Key in keyof typeof tagNames]: Tag;
};
