/**
 * @fileoverview 测验领域核心类型：题目结构、题库定义、答题映射、内置/自定义题库 id、运行时模块契约。
 * 内置题走 `quiz/registry`，自定义题 id 为 `custom:<uuid>`，由 `useCustomQuiz` 提供 definition。
 */

/** 单题结构：options 的 key 由题库约定（如 A–D） */
export interface QuizQuestion<TOption extends string = string> {
  id: number
  title: string
  /** 未设置时使用 definition.defaultCategory */
  category?: string
  options: Record<TOption, string>
}

/** 测验元数据 + 题目列表 + 选项展示顺序 */
export interface QuizDefinition<TOption extends string = string> {
  id: string
  defaultCategory: string
  /** 选项按钮顺序；须覆盖每道题 options 的 key */
  optionOrder: readonly TOption[]
  questions: readonly QuizQuestion<TOption>[]
}

export interface NormalizedQuestion<TOption extends string = string> {
  id: number
  text: string
  category: string
  options: Record<TOption, string>
}

export type AnswerMap<TOption extends string = string> = Partial<Record<number, TOption>>

export interface GenerateResultOptions {
  /** 注入随机源（与 `~/utils/random` 的 RandomSource 一致） */
  random?: { next: () => number }
}

/** 内置题库 id；自定义题为 \`custom:\` + UUID（见 \`useCustomQuiz\`） */
export type QuizBankId = 'sbti' | 'youth-stress' | `custom:${string}`

export function isCustomBankId(id: string): id is `custom:${string}` {
  return id.startsWith('custom:') && id.length > 'custom:'.length
}

/** 运行时绑定：题库定义 + 计分/生成结果（可替换整个模块实现换测验） */
export interface QuizRuntimeModule<TOption extends string, TResult> {
  id: string
  definition: QuizDefinition<TOption>
  computeResult: (answers: AnswerMap<TOption>, options?: GenerateResultOptions) => TResult
}

/** 注册表用：计分入口统一为 string 选项，具体题库内部再收窄类型 */
export interface QuizRuntimeModuleLoose<TResult> {
  id: string
  definition: QuizDefinition<string>
  computeResult: (answers: AnswerMap<string>, options?: GenerateResultOptions) => TResult
}
