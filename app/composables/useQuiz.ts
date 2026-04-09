import { computed, ref } from 'vue'
import { sbtiQuestions, type SbtiOption } from '~/data/sbti/questions'

export interface Question {
  id: number
  text: string
  category: string
  options: Record<SbtiOption, string>
}

export type AnswerMap = Partial<Record<number, SbtiOption>>

export const useQuiz = () => {
  const questions = computed<Question[]>(() =>
    sbtiQuestions.map(q => ({
      id: q.id,
      text: q.title,
      category: 'SBTI · 抽象怪·究极逆天版',
      options: q.options
    }))
  )

  const currentIndex = ref(0)
  const answers = ref<AnswerMap>({})

  const currentQuestion = computed(() => questions.value[currentIndex.value])
  const totalQuestions = computed(() => questions.value.length)
  const progress = computed(() => ((currentIndex.value + 1) / totalQuestions.value) * 100)
  const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
  const isFirstQuestion = computed(() => currentIndex.value === 0)

  const selectAnswer = (questionId: number, value: SbtiOption) => {
    answers.value[questionId] = value
  }

  const nextQuestion = () => {
    if (!isLastQuestion.value) {
      currentIndex.value++
    }
  }

  const prevQuestion = () => {
    if (!isFirstQuestion.value) {
      currentIndex.value--
    }
  }

  const jumpToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions.value) {
      currentIndex.value = index
    }
  }

  const isQuestionAnswered = (questionId: number) => {
    return answers.value[questionId] !== undefined
  }

  const resetQuiz = () => {
    currentIndex.value = 0
    answers.value = {}
  }

  return {
    questions,
    currentIndex,
    answers,
    currentQuestion,
    totalQuestions,
    progress,
    isLastQuestion,
    isFirstQuestion,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    isQuestionAnswered,
    resetQuiz
  }
}
