/**
 * @fileoverview 用户上传 Markdown 经 `parseCustomQuizMd` 后的结构化结果类型。
 */
import type { QuizDefinition } from '~/types/quiz'

/** 从 Markdown 解析出的自定义题库（用于运行时计分与展示） */
export interface ParsedCustomQuiz {
  /** 稳定 id，用于 useQuiz 在题库变更时重置答案 */
  id: string
  definition: QuizDefinition<string>
  /** 题号 → 选项键 → 维度全名 → 加分 */
  scoreMap: Record<number, Record<string, Record<string, number>>>
  /** 计分维度顺序（用于展示与累加） */
  dimensions: string[]
  /** 从「计算规则」中解析的主类型维度（若有） */
  mainDimensionFromRules: string | null
  jitterMin: number
  jitterMax: number
  /** 从文中「最大分参考」解析，缺省时由映射表推算 */
  dimensionMaxOverride: Partial<Record<string, number>>
}

export interface ParseCustomMdResult {
  ok: true
  data: ParsedCustomQuiz
}

export interface ParseCustomMdError {
  ok: false
  errors: string[]
}
