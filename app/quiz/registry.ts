/**
 * @fileoverview 内置题库唯一入口：仅注册 SBTI 与「年轻人社会压力」两套固定数据。
 * 用户上传的题库不在此注册，由 `useCustomQuiz().runtimeModuleFor('custom:…')` 动态提供。
 */
import { youthStressQuizDefinition } from '~/data/youth-stress/definition'
import { sbtiQuizDefinition } from '~/data/sbti/definition'
import type { AnswerMap, GenerateResultOptions, QuizRuntimeModuleLoose } from '~/types/quiz'
import type { QuizResultPayload } from '~/types/quiz-result'
import { generateSbtiResult } from '~/utils/sbti'
import { generateYouthStressResult } from '~/utils/youthStress'

const sbtiModule: QuizRuntimeModuleLoose<QuizResultPayload> = {
  id: sbtiQuizDefinition.id,
  definition: sbtiQuizDefinition,
  computeResult: (answers: AnswerMap<string>, options?: GenerateResultOptions) =>
    generateSbtiResult(answers, options)
}

const youthModule: QuizRuntimeModuleLoose<QuizResultPayload> = {
  id: youthStressQuizDefinition.id,
  definition: youthStressQuizDefinition,
  computeResult: (answers: AnswerMap<string>, options?: GenerateResultOptions) =>
    generateYouthStressResult(answers, options)
}

const registry: Record<'sbti' | 'youth-stress', QuizRuntimeModuleLoose<QuizResultPayload>> = {
  sbti: sbtiModule,
  'youth-stress': youthModule
}

export type BuiltInQuizId = keyof typeof registry

/** 仅内置 \`sbti\` / \`youth-stress\`；自定义题请用 \`useCustomQuiz().runtimeModuleFor\` */
export function getQuizRuntime(id: BuiltInQuizId): QuizRuntimeModuleLoose<QuizResultPayload> {
  return registry[id] ?? registry.sbti
}
