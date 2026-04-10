/** 可注入随机源：单测可换固定种子，线上默认 Math.random */
export interface RandomSource {
  /** [0, 1) */
  next: () => number
}

export const mathRandomSource: RandomSource = {
  next: () => Math.random()
}

/** 简易可复现序列（确定性测试用，非密码学随机） */
export function createMulberry32(seed: number): RandomSource {
  let t = seed >>> 0
  return {
    next: () => {
      t += 0x6d2b79f5
      let r = Math.imul(t ^ (t >>> 15), 1 | t)
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296
    }
  }
}
