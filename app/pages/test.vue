<script setup lang="ts">
/**
 * 测验页：Cookie 选题库 id → 内置 `getQuizRuntime` 或自定义 `useCustomQuiz.runtimeModuleFor`，
 * 统一 `useQuiz(definition)`；提交时用当前模块 `computeResult` 生成 `QuizResultPayload`。
 */
import { useQuiz } from '~/composables/useQuiz'
import { useAppStrings } from '~/composables/useAppStrings'
import { useQuizBank } from '~/composables/useQuizBank'
import { useCustomQuiz } from '~/composables/useCustomQuiz'
import { getQuizRuntime } from '~/quiz/registry'
import type { QuizBankId } from '~/types/quiz'
import type { QuizResultPayload } from '~/types/quiz-result'

const strings = useAppStrings()
const { bankId, setBankId } = useQuizBank()
const customQuiz = useCustomQuiz()

const quizModule = computed(() => {
  const id = bankId.value as string
  if (id.startsWith('custom:')) {
    const m = customQuiz.runtimeModuleFor(id as QuizBankId)
    if (m) return m
  }
  if (id === 'sbti' || id === 'youth-stress') {
    return getQuizRuntime(id)
  }
  return getQuizRuntime('sbti')
})

const definition = computed(() => quizModule.value.definition)

onMounted(() => {
  customQuiz.migrateV1IfNeeded()
  const id = bankId.value as string
  if (id === 'custom') {
    const first = customQuiz.entries.value[0]
    setBankId(first ? (`custom:${first.id}` as QuizBankId) : 'sbti')
    return
  }
  if (id.startsWith('custom:') && !customQuiz.runtimeModuleFor(id as QuizBankId)) {
    setBankId('sbti')
  }
})

watch(
  () => [bankId.value, customQuiz.entries.value.map(e => e.id).join(',')] as [string, string],
  () => {
    const id = bankId.value as string
    if (id.startsWith('custom:') && !customQuiz.runtimeModuleFor(id as QuizBankId)) {
      setBankId('sbti')
    }
  },
  { immediate: true }
)

const {
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
} = useQuiz(definition)

const toast = useToast()
const isSubmitted = ref(false)
const result = ref<QuizResultPayload | null>(null)

const handleAnswer = (value: string) => {
  if (currentQuestion.value) {
    selectAnswer(currentQuestion.value.id, value)
  }
}

const handleNext = () => {
  const q = currentQuestion.value
  if (!q) return
  if (answers.value[q.id] === undefined) {
    toast.add({
      title: strings.value.quiz.waitNeedAnswerTitle,
      description: strings.value.quiz.waitNeedAnswerDesc,
      color: 'primary',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }
  nextQuestion()
}

const handleSubmit = () => {
  const q = currentQuestion.value
  if (!q) return
  if (answers.value[q.id] === undefined) {
    toast.add({
      title: strings.value.quiz.waitFinalTitle,
      description: strings.value.quiz.waitFinalDesc,
      color: 'primary',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  const firstUnanswered = questions.value.findIndex(item => !isQuestionAnswered(item.id))
  if (firstUnanswered !== -1) {
    toast.add({
      title: strings.value.quiz.unfinishedTitle,
      description: strings.value.quiz.unfinishedDesc(firstUnanswered + 1),
      color: 'primary',
      icon: 'i-heroicons-exclamation-circle'
    })
    jumpToQuestion(firstUnanswered)
    return
  }

  result.value = quizModule.value.computeResult(answers.value)
  isSubmitted.value = true
}

const handleRestart = () => {
  resetQuiz()
  isSubmitted.value = false
  result.value = null
}

const handleJump = (index: number) => {
  jumpToQuestion(index)
}

const currentAnswer = computed(() => {
  const q = currentQuestion.value
  if (!q) return undefined
  return answers.value[q.id]
})

watch(bankId, () => {
  isSubmitted.value = false
  result.value = null
})
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-65px-121px)] w-full flex-col items-center bg-[color:var(--sbti-page-bg)] px-4 py-12 sm:py-20"
  >
    <QuizBankControls class="mb-8 w-full max-w-3xl" />

    <div v-if="!isSubmitted && currentQuestion" class="flex w-full flex-col items-center">
      <QuizProgress
        :current-step="currentIndex + 1"
        :total-steps="totalQuestions"
        :category="currentQuestion.category"
        :progress="progress"
      />

      <QuizAnswerSheet
        :questions="questions"
        :current-index="currentIndex"
        :answers="answers"
        @jump="handleJump"
      />

      <QuizQuestion :question-text="currentQuestion.text">
        <QuizOptions
          :model-value="currentAnswer"
          :options="currentQuestion.options"
          :option-order="optionOrder"
          @update:model-value="handleAnswer"
        />
      </QuizQuestion>

      <QuizNavigation
        :is-first="isFirstQuestion"
        :is-last="isLastQuestion"
        :has-answer="!!currentAnswer"
        @prev="prevQuestion"
        @next="handleNext"
        @submit="handleSubmit"
      />
    </div>

    <div v-else class="flex w-full flex-col items-center">
      <QuizResult v-if="result" :result="result" @restart="handleRestart" />
    </div>
  </div>
</template>
