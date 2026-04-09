import {
  sbtiDimensionMaxScore,
  sbtiScoreMap,
  type SbtiDimension,
  type SbtiOption
} from '~/data/sbti/questions'

export interface SbtiResultTag {
  name: string
  percent: number
}

export interface SbtiResult {
  mainTag: SbtiResultTag
  topTags: SbtiResultTag[]
  hiddenEggs: string[]
  ending: string
  fullText: string
}

const allDimensions: SbtiDimension[] = [
  '抽象怪',
  '杠精',
  '圣母送钱',
  '摆烂自闭',
  '修狗冤种',
  '小丑帝'
]

const round1 = (n: number) => Math.round(n * 10) / 10

const rand = (min: number, max: number) => min + Math.random() * (max - min)

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

const computeScores = (answers: Partial<Record<number, SbtiOption>>) => {
  const scores: Record<SbtiDimension, number> = {
    抽象怪: 0,
    杠精: 0,
    圣母送钱: 0,
    摆烂自闭: 0,
    修狗冤种: 0,
    小丑帝: 0
  }

  for (const [idText, option] of Object.entries(answers)) {
    if (!option) continue
    const id = Number(idText)
    const rule = sbtiScoreMap[id]?.[option]
    if (!rule) continue

    for (const dim of allDimensions) {
      const delta = rule[dim]
      if (typeof delta === 'number') scores[dim] += delta
    }
  }

  return scores
}

const computePercents = (scores: Record<SbtiDimension, number>) => {
  const percents: Record<SbtiDimension, number> = {
    抽象怪: 0,
    杠精: 0,
    圣母送钱: 0,
    摆烂自闭: 0,
    修狗冤种: 0,
    小丑帝: 0
  }

  for (const dim of allDimensions) {
    const max = sbtiDimensionMaxScore[dim]
    const base = (scores[dim] / max) * 100
    const jitter = rand(-4, 6)
    percents[dim] = round1(clamp(base + jitter, 0, 100))
  }

  return percents
}

const pickHiddenEggs = (percents: Record<SbtiDimension, number>) => {
  const eggs: string[] = []
  if (percents.抽象怪 >= 90) eggs.push('核弹级抽象怪（破防警告）')
  if (percents.杠精 >= 80) eggs.push('嘴炮之王（杠到天荒地老）')
  if (percents.圣母送钱 >= 85) eggs.push('人形ATM（圣母心溢出）')
  if (percents.摆烂自闭 >= 85) eggs.push('终极摆烂（人生已读不回）')
  if (percents.修狗冤种 >= 90) eggs.push('究极冤种（修狗の宿命）')
  if (percents.小丑帝 >= 80) eggs.push('小丑登基（请自带BGM）')
  return eggs
}

const endingPool = [
  '你不是一个人在发癫，你是一个群体精神现象。',
  '建议你把“我没事”改成“我有病”。',
  '你的生活像极了段子：别笑，笑的是你。',
  '你不是摆烂，你是在用灵魂对抗现实。',
  '你不是小丑，你是小丑界的天选之人。',
  '你不是冤种，你是冤种里的冤种王中王。'
]

const formatTagLine = (tags: SbtiResultTag[]) => {
  const lines = tags.map((t, i) => `${String(i + 1).padStart(2, '0')}）${t.name}（${t.percent}%）`)
  return lines.join('\n')
}

export const generateSbtiResult = (answers: Partial<Record<number, SbtiOption>>): SbtiResult => {
  const scores = computeScores(answers)
  const percents = computePercents(scores)

  const sorted = allDimensions
    .map(name => ({ name, percent: percents[name] }))
    .sort((a, b) => b.percent - a.percent)

  const topTags: SbtiResultTag[] = sorted.slice(0, 6)
  const mainTagName = topTags[0]?.name ?? '抽象怪'
  const mainPercent = round1(clamp(rand(95, 100), 95, 100))

  const mainTag: SbtiResultTag = {
    name: `${mainTagName}·究极逆天版`,
    percent: mainPercent
  }

  const hiddenEggs = pickHiddenEggs(percents)
  const ending =
    endingPool[Math.floor(Math.random() * endingPool.length)] ??
    '你不是一个人在发癫，你是一个群体精神现象。'

  const fullText = [
    '【SB TI · 傻逼人格测试 最终鉴定书】',
    '',
    `🎉 主标签：${mainTag.name}（匹配度 ${mainTag.percent}%）`,
    '',
    '📊 你的TOP标签排行：',
    formatTagLine(topTags),
    '',
    hiddenEggs.length ? '🥚 隐藏彩蛋：' : '🥚 隐藏彩蛋：无（说明你还没到极致）',
    hiddenEggs.length ? hiddenEggs.map(e => `- ${e}`).join('\n') : '',
    '',
    `💬 结尾语：${ending}`,
    '',
    '（本测试纯属整活，别当真，转发给朋友一起破防。）'
  ]
    .filter(line => line !== '')
    .join('\n')

  return {
    mainTag,
    topTags,
    hiddenEggs,
    ending,
    fullText
  }
}
