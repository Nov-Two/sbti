/**
 * @fileoverview 当前选中的题库 id（Cookie 持久化）：`sbti` | `youth-stress` | `custom:<uuid>`。
 * 与 `useCustomQuiz` 配合：后者管本地多份自定义题，本 composable 只管「选中哪一套」。
 */
import type { QuizBankId } from '~/types/quiz'

const QUIZ_BANK_COOKIE = 'sbti-quiz-bank'

export const useQuizBank = () => {
  const cookie = useCookie<string>(QUIZ_BANK_COOKIE, {
    default: () => 'sbti',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/'
  })

  const bankId = computed<QuizBankId>(() => (cookie.value ?? 'sbti') as QuizBankId)

  const setBankId = (id: QuizBankId | string) => {
    cookie.value = id
  }

  return { bankId, setBankId }
}
