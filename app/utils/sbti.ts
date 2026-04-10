import {
  sbtiDimensionMaxScore,
  sbtiScoreMap,
  type SbtiDimension,
  type SbtiOption
} from '~/data/sbti/questions'
import { sbtiEndingPool, sbtiHiddenEggRules, sbtiResultCopy } from '~/data/sbti/narrative'
import type { AnswerMap, GenerateResultOptions } from '~/types/quiz'
import type { QuizResultPayload, QuizResultTag } from '~/types/quiz-result'
import { mathRandomSource, type RandomSource } from '~/utils/random'

export type SbtiResultTag = QuizResultTag
export type SbtiResult = QuizResultPayload

const allDimensions: SbtiDimension[] = [
  '抽象怪',
  '杠精',
  '圣母送钱',
  '摆烂自闭',
  '修狗冤种',
  '小丑帝'
]

const round1 = (n: number) => Math.round(n * 10) / 10

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

const randBetween = (random: RandomSource, min: number, max: number) =>
  min + random.next() * (max - min)

const emptyScores = (): Record<SbtiDimension, number> => ({
  抽象怪: 0,
  杠精: 0,
  圣母送钱: 0,
  摆烂自闭: 0,
  修狗冤种: 0,
  小丑帝: 0
})

const computeScores = (answers: AnswerMap<SbtiOption>) => {
  const scores = emptyScores()

  for (const [idText, option] of Object.entries(answers)) {
    if (!option) continue
    const id = Number(idText)
    const rule = sbtiScoreMap[id]?.[option as SbtiOption]
    if (!rule) continue

    for (const dim of allDimensions) {
      const delta = rule[dim]
      if (typeof delta === 'number') scores[dim] += delta
    }
  }

  return scores
}

const computePercents = (
  scores: Record<SbtiDimension, number>,
  random: RandomSource
): Record<SbtiDimension, number> => {
  const percents = emptyScores() as Record<SbtiDimension, number>

  for (const dim of allDimensions) {
    const max = sbtiDimensionMaxScore[dim]
    const base = (scores[dim] / max) * 100
    const jitter = randBetween(random, -4, 6)
    percents[dim] = round1(clamp(base + jitter, 0, 100))
  }

  return percents
}

const pickHiddenEggs = (percents: Record<SbtiDimension, number>) => {
  const eggs: string[] = []
  for (const rule of sbtiHiddenEggRules) {
    if (percents[rule.dimension] >= rule.minPercent) {
      eggs.push(rule.text)
    }
  }
  return eggs
}

const formatTagLine = (tags: SbtiResultTag[]) => {
  const lines = tags.map((t, i) => `${String(i + 1).padStart(2, '0')}）${t.name}（${t.percent}%）`)
  return lines.join('\n')
}

export const generateSbtiResult = (
  answers: AnswerMap<string>,
  options?: GenerateResultOptions
): QuizResultPayload => {
  const random = options?.random ?? mathRandomSource

  const scores = computeScores(answers as AnswerMap<SbtiOption>)
  const percents = computePercents(scores, random)

  const sorted = allDimensions
    .map(name => ({ name, percent: percents[name] }))
    .sort((a, b) => b.percent - a.percent)

  const topTags: SbtiResultTag[] = sorted.slice(0, 6)
  const mainTagName = topTags[0]?.name ?? '抽象怪'
  const mainPercent = round1(clamp(randBetween(random, 95, 100), 95, 100))

  const mainTag: SbtiResultTag = {
    name: `${mainTagName}${sbtiResultCopy.mainTagSuffix}`,
    percent: mainPercent
  }

  const hiddenEggs = pickHiddenEggs(percents)
  const ending =
    sbtiEndingPool[Math.floor(random.next() * sbtiEndingPool.length)] ??
    sbtiEndingPool[0] ??
    '你不是一个人在发癫，你是一个群体精神现象。'

  const fullText = [
    sbtiResultCopy.documentTitle,
    '',
    `🎉 主标签：${mainTag.name}（匹配度 ${mainTag.percent}%）`,
    '',
    '📊 你的TOP标签排行：',
    formatTagLine(topTags),
    '',
    hiddenEggs.length ? sbtiResultCopy.eggsHeaderWhenSome : sbtiResultCopy.eggsHeaderWhenNone,
    hiddenEggs.length ? hiddenEggs.map(e => `- ${e}`).join('\n') : '',
    '',
    `💬 结尾语：${ending}`,
    '',
    sbtiResultCopy.disclaimer
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
