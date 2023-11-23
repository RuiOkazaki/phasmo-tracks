export type GhostParameter = {
  id: number;
  enName: string;
  jpName: string;
  lowSpeed: number;
  highSpeed: number;
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
};
