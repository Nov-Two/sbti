/**
 * @fileoverview 自定义题库结果生成：按 `ParsedCustomQuiz.scoreMap` 累加维度分、百分比与主视角文案。
 */
import type { ParsedCustomQuiz } from '~/types/custom-quiz'
import type { AnswerMap, GenerateResultOptions } from '~/types/quiz'
import type { QuizResultPayload, QuizResultTag } from '~/types/quiz-result'
import { mathRandomSource, type RandomSource } from '~/utils/random'

const round1 = (n: number) => Math.round(n * 10) / 10
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
const randBetween = (random: RandomSource, min: number, max: number) =>
  min + random.next() * (max - min)

export const generateCustomQuizResult = (
  parsed: ParsedCustomQuiz,
  answers: AnswerMap<string>,
  options?: GenerateResultOptions
): QuizResultPayload => {
  const random = options?.random ?? mathRandomSource
  const {
    scoreMap,
    dimensions,
    dimensionMaxOverride,
    mainDimensionFromRules,
    jitterMin,
    jitterMax
  } = parsed

  const scores: Record<string, number> = {}
  for (const d of dimensions) scores[d] = 0

  for (const [idText, opt] of Object.entries(answers)) {
    if (!opt) continue
    const id = Number(idText)
    const rule = scoreMap[id]?.[opt]
    if (!rule) continue
    for (const d of dimensions) {
      scores[d] = (scores[d] ?? 0) + (rule[d] ?? 0)
    }
  }

  const percents: Record<string, number> = {}
  for (const d of dimensions) {
    const max = dimensionMaxOverride[d] ?? 1
    const base = ((scores[d] ?? 0) / max) * 100
    const jitter = randBetween(random, jitterMin, jitterMax)
    percents[d] = round1(clamp(base + jitter, 0, 100))
  }

  const sortedByPercent = [...dimensions].sort((a, b) => (percents[b] ?? 0) - (percents[a] ?? 0))
  const mainName =
    mainDimensionFromRules && dimensions.includes(mainDimensionFromRules)
      ? mainDimensionFromRules
      : sortedByPercent[0]!

  const mainPercent = mainDimensionFromRules
    ? round1(clamp(randBetween(random, 95, 99), 95, 99))
    : round1(clamp(percents[mainName] ?? 95, 0, 100))

  const mainTag: QuizResultTag = {
    name: `${mainName}·主视角`,
    percent: mainPercent
  }

  const othersSorted: QuizResultTag[] = dimensions
    .filter(d => d !== mainName)
    .map(name => ({ name, percent: percents[name] ?? 0 }))
    .sort((a, b) => b.percent - a.percent)

  const topTags: QuizResultTag[] = [mainTag, ...othersSorted.slice(0, 5)]

  const fullText = [
    '自定义测验结果',
    '',
    `主视角：${mainTag.name}（${mainTag.percent}%）`,
    '',
    '维度分布（参考）：',
    ...topTags.map((t, i) => `${String(i + 1).padStart(2, '0')}）${t.name}（${t.percent}%）`),
    '',
    '本结果依据你上传的 Markdown 中的计算规则生成，仅供娱乐参考。'
  ].join('\n')

  return {
    mainTag,
    topTags,
    hiddenEggs: [],
    ending: '',
    fullText
  }
}
