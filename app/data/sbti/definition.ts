import type { QuizDefinition } from '~/types/quiz'
import { sbtiQuestions, type SbtiOption } from './questions'

export const sbtiQuizDefinition: QuizDefinition<SbtiOption> = {
  id: 'sbti',
  defaultCategory: 'SBTI · 抽象怪·究极逆天版',
  optionOrder: ['A', 'B', 'C', 'D'],
  questions: sbtiQuestions
}
