/**
 * @fileoverview 单套测验会话：题目列表、当前索引、答案映射；`definition.id` 变更时重置进度（切换题库）。
 */
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import type { AnswerMap, NormalizedQuestion, QuizDefinition } from '~/types/quiz'

export function useQuiz<TOption extends string>(
  definition: MaybeRefOrGetter<QuizDefinition<TOption>>
) {
  const questions = computed<NormalizedQuestion<TOption>[]>(() => {
    const d = toValue(definition)
    return d.questions.map(q => ({
      id: q.id,
      text: q.title,
      category: q.category ?? d.defaultCategory,
      options: q.options
    }))
  })

  const optionOrder = computed(() => toValue(definition).optionOrder)

  const currentIndex = ref(0)
  const answers = ref<AnswerMap<TOption>>({})

  watch(
    () => toValue(definition).id,
    () => {
      currentIndex.value = 0
      answers.value = {}
    }
  )

  const currentQuestion = computed(() => questions.value[currentIndex.value])
  const totalQuestions = computed(() => questions.value.length)
  const progress = computed(() => ((currentIndex.value + 1) / totalQuestions.value) * 100)
  const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
  const isFirstQuestion = computed(() => currentIndex.value === 0)

  const selectAnswer = (questionId: number, value: TOption) => {
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
    quizId: computed(() => toValue(definition).id),
    optionOrder,
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
