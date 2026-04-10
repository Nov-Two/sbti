import type { QuizDefinition } from '~/types/quiz'
import { stressQuestions, type StressOption } from './questions'

export const youthStressQuizDefinition: QuizDefinition<StressOption> = {
  id: 'youth-stress',
  defaultCategory: '年轻人社会压力测试 · 你扛住了多少？',
  optionOrder: ['A', 'B', 'C', 'D', 'E'],
  questions: stressQuestions
}
