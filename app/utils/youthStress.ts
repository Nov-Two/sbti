import {
  stressDimensionMaxScore,
  stressScoreMap,
  type StressDimension,
  type StressOption
} from '~/data/youth-stress/questions'
import {
  youthStressEndingPool,
  youthStressMainNarrative,
  youthStressResultCopy
} from '~/data/youth-stress/narrative'
import type { AnswerMap, GenerateResultOptions } from '~/types/quiz'
import type { QuizResultPayload, QuizResultTag } from '~/types/quiz-result'
import { mathRandomSource, type RandomSource } from '~/utils/random'

const allDimensions: StressDimension[] = [
  '韧性型',
  '卷王型',
  '反思型',
  '隐忍型',
  '迷茫型',
  '平衡型'
]

const round1 = (n: number) => Math.round(n * 10) / 10
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
const randBetween = (random: RandomSource, min: number, max: number) =>
  min + random.next() * (max - min)

const emptyScores = (): Record<StressDimension, number> => ({
  韧性型: 0,
  卷王型: 0,
  反思型: 0,
  隐忍型: 0,
  迷茫型: 0,
  平衡型: 0
})

const computeScores = (answers: AnswerMap<string>) => {
  const scores = emptyScores()
  for (const [idText, option] of Object.entries(answers)) {
    if (!option) continue
    const id = Number(idText)
    const rule = stressScoreMap[id]?.[option as StressOption]
    if (!rule) continue
    for (const dim of allDimensions) {
      const delta = rule[dim]
      if (typeof delta === 'number') scores[dim] += delta
    }
  }
  return scores
}

const computePercents = (
  scores: Record<StressDimension, number>,
  random: RandomSource
): Record<StressDimension, number> => {
  const percents = emptyScores()
  for (const dim of allDimensions) {
    const max = stressDimensionMaxScore[dim] || 1
    const base = (scores[dim] / max) * 100
    const jitter = randBetween(random, -5, 8)
    percents[dim] = round1(clamp(base + jitter, 0, 100))
  }
  return percents
}

const formatTagLine = (tags: QuizResultTag[]) => {
  return tags
    .map((t, i) => `${String(i + 1).padStart(2, '0')}）${t.name}（${t.percent}%）`)
    .join('\n')
}

export const generateYouthStressResult = (
  answers: AnswerMap<string>,
  options?: GenerateResultOptions
): QuizResultPayload => {
  const random = options?.random ?? mathRandomSource

  const scores = computeScores(answers)
  const percents = computePercents(scores, random)

  const mainPercent = round1(clamp(randBetween(random, 95, 99), 95, 99))
  const mainTag: QuizResultTag = {
    name: `韧性型${youthStressResultCopy.mainTagSuffix}`,
    percent: mainPercent
  }

  const othersSorted = allDimensions
    .filter(d => d !== '韧性型')
    .map(name => ({ name, percent: percents[name] }))
    .sort((a, b) => b.percent - a.percent)

  const topTags: QuizResultTag[] = [mainTag, ...othersSorted.slice(0, 5)]

  const ending =
    youthStressEndingPool[Math.floor(random.next() * youthStressEndingPool.length)] ??
    youthStressEndingPool[0]!

  const fullText = [
    youthStressResultCopy.documentTitle,
    '',
    `🌿 主视角：${mainTag.name}（匹配度 ${mainTag.percent}%）`,
    '',
    youthStressMainNarrative,
    '',
    '📊 维度分布（参考）：',
    formatTagLine(topTags),
    '',
    `💬 结尾语：${ending}`,
    '',
    youthStressResultCopy.disclaimer
  ].join('\n')

  return {
    mainTag,
    topTags,
    hiddenEggs: [],
    ending,
    fullText
  }
}
