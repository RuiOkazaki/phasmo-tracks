type GhostParameter = {
  id: number;
  enName: string;
  jpName: string;
  lowSpeed: number;
  highSpeed: number;
};

// calculateSpeedの引数
type CalculateSpeedArgs = {
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

abstract class Ghost {
  params: GhostParameter;

  constructor(params: GhostParameter) {
    this.params = params;
  }

  abstract calculateSpeed(calculateSpeedArgs: CalculateSpeedArgs): number;
}

class Jinn extends Ghost {
  constructor() {
    super({
      id: 1,
      enName: 'Jinn',
      jpName: 'ジン',
      lowSpeed: 1.7,
      highSpeed: 2.5,
    });
  }

  calculateSpeed({ distance }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    if (distance >= 3) {
      return highSpeed;
    } else {
      return lowSpeed;
    }
  }
}

class Revenant extends Ghost {
  constructor() {
    super({
      id: 2,
      enName: 'Revenant',
      jpName: 'レヴナント',
      lowSpeed: 1.5,
      highSpeed: 2.5,
    });
  }

  calculateSpeed({ isLooking }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    if (isLooking) {
      return highSpeed;
    } else {
      return lowSpeed;
    }
  }
}

class Hantu extends Ghost {
  constructor() {
    super({
      id: 3,
      enName: 'Hantu',
      jpName: 'ハントゥ',
      lowSpeed: 1.44,
      highSpeed: 2.7,
    });
  }

  calculateSpeed({ temperature }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    // 15度以上の場合はlowSpeed
    // 0度以下の場合はhighSpeed
    // それ以外の場合は気温に応じて速度が変化する
    if (temperature >= 15) {
      return lowSpeed;
    } else if (temperature <= 0) {
      return highSpeed;
    } else {
      return 1.4 + ((2.7 - 1.4) * (15 - temperature)) / 15;
    }
  }
}

class Myling extends Ghost {
  constructor() {
    super({
      id: 4,
      enName: 'Myling',
      jpName: 'マイリング',
      lowSpeed: -1,
      highSpeed: 1.7,
    });
  }

  calculateSpeed({ distance }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    if (distance >= 12) {
      // 12m以上離れている場合は、音が聞こえない
      return lowSpeed;
    } else {
      return highSpeed;
    }
  }
}

class TheTwins extends Ghost {
  constructor() {
    super({
      id: 5,
      enName: 'The Twins',
      jpName: 'ツインズ',
      lowSpeed: 1.53,
      highSpeed: 1.87,
    });
  }

  calculateSpeed(): number {
    const { highSpeed, lowSpeed } = this.params;

    if (Math.random() < 0.5) {
      return highSpeed;
    } else {
      return lowSpeed;
    }
  }
}

class Raiju extends Ghost {
  constructor() {
    super({
      id: 6,
      enName: 'Raiju',
      jpName: 'ライジュウ',
      lowSpeed: 1.7,
      highSpeed: 2.5,
    });
  }

  calculateSpeed({ isElectronic }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    if (isElectronic) {
      return highSpeed;
    } else {
      return lowSpeed;
    }
  }
}

class Moroi extends Ghost {
  constructor() {
    super({
      id: 7,
      enName: 'Moroi',
      jpName: 'モーロイ',
      lowSpeed: 1.5,
      highSpeed: 2.25,
    });
  }

  calculateSpeed({ san }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    // 45%以上の場合はlowSpeed
    // 5%以下の場合はhighSpeed
    // それ以外の場合は、SAN値に応じて速度が変化する
    if (san >= 45) {
      return lowSpeed;
    } else if (san <= 5) {
      return highSpeed;
    } else {
      return lowSpeed + ((highSpeed - lowSpeed) * (45 - san)) / 40;
    }
  }
}

class Deogen extends Ghost {
  constructor() {
    super({
      id: 8,
      enName: 'Deogen',
      jpName: 'デオヘン',
      lowSpeed: 0.4,
      highSpeed: 3,
    });
  }

  calculateSpeed({ distance }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    // 6m以上の場合はhighSpeed
    // 2.5m以下の場合はlowSpeed
    // それ以外の場合は距離に応じて速度が変化する
    if (distance >= 6) {
      return highSpeed;
    } else if (distance >= 2.5) {
      // 距離が小さいほど移動スピードを遅くする
      return 3 - ((3 - 0.4) * (6 - distance)) / 3.5;
    } else {
      return lowSpeed;
    }
  }
}

class Thaye extends Ghost {
  constructor() {
    super({
      id: 9,
      enName: 'Thaye',
      jpName: 'セーイ',
      lowSpeed: 1,
      highSpeed: 2.75,
    });
  }

  calculateSpeed({ elapsedTime }: CalculateSpeedArgs): number {
    const { highSpeed, lowSpeed } = this.params;

    // 0分の場合はhighSpeed
    // 10分以上の場合はlowSpeed
    // 10分未満の場合は経過時間に応じて速度が変化する
    if (elapsedTime < 10) {
      return highSpeed - 0.175 * elapsedTime;
    } else {
      return lowSpeed;
    }
  }
}
