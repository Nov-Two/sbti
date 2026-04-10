/**
 * @fileoverview 兼容旧代码的默认内置模块导出；新代码请直接用 `getQuizRuntime('sbti' | 'youth-stress')`。
 */
import { getQuizRuntime } from '~/quiz/registry'
import type { QuizBankId } from '~/types/quiz'

/** @deprecated 请使用 `getQuizRuntime(bankId)`；保留默认 SBTI 便于旧引用 */
export const activeQuiz = getQuizRuntime('sbti' satisfies QuizBankId)
