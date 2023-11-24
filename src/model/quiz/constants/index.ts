import { Difficulties } from '../type';

export const difficultiesNames = {
  amateur: 'アマチュア',
  intermediate: 'セミプロフェッショナル',
  professional: 'プロフェッショナル',
  nightmare: 'ナイトメア',
} as const;

export const difficulties: Difficulties = {
  amateur: {
    jaName: difficultiesNames.amateur,
    description: '初心者向け。<wbr />ゴースト一覧あり。',
  },
  intermediate: {
    jaName: difficultiesNames.intermediate,
    description: '中級者向け。<wbr />ゴースト一覧の情報が少なくなる。',
  },
  professional: {
    jaName: difficultiesNames.professional,
    description:
      '上級者向け。<wbr />ゴースト一覧なし。<wbr />絞り込み機能の補助メモリが非表示になる。',
  },
  nightmare: {
    jaName: difficultiesNames.nightmare,
    description:
      '超上級者向け。<wbr />サウンド再生時間が短くなり、<wbr />再生回数の制限がある。',
  },
};
