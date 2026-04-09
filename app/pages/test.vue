<script setup lang="ts">
import { useQuiz } from '~/composables/useQuiz'
import type { SbtiOption } from '~/data/sbti/questions'
import { generateSbtiResult, type SbtiResult } from '~/utils/sbti'

const {
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
} = useQuiz()

const toast = useToast()
const isSubmitted = ref(false)
const result = ref<SbtiResult | null>(null)

const handleAnswer = (value: SbtiOption) => {
  if (currentQuestion.value) {
    selectAnswer(currentQuestion.value.id, value)
  }
}

const handleNext = () => {
  const q = currentQuestion.value
  if (!q) return
  if (answers.value[q.id] === undefined) {
    toast.add({
      title: 'Wait!',
      description: 'Please select an answer before moving to the next question.',
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
      title: 'Wait!',
      description: 'Please select an answer for the final question.',
      color: 'primary',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  const firstUnanswered = questions.value.findIndex(item => !isQuestionAnswered(item.id))
  if (firstUnanswered !== -1) {
    toast.add({
      title: '还有未完成的题目',
      description: `请先完成第 ${firstUnanswered + 1} 题`,
      color: 'primary',
      icon: 'i-heroicons-exclamation-circle'
    })
    jumpToQuestion(firstUnanswered)
    return
  }

  result.value = generateSbtiResult(answers.value)
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
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-65px-121px)] w-full flex-col items-center bg-[#101114] px-4 py-12 sm:py-20"
  >
    <div v-if="!isSubmitted && currentQuestion" class="flex w-full flex-col items-center">
      <!-- Progress Bar -->
      <QuizProgress
        :current-step="currentIndex + 1"
        :total-steps="totalQuestions"
        :category="currentQuestion.category"
        :progress="progress"
      />

      <!-- Answer Sheet Widget -->
      <QuizAnswerSheet
        :questions="questions"
        :current-index="currentIndex"
        :answers="answers"
        @jump="handleJump"
      />

      <!-- Question Card -->
      <QuizQuestion :question-text="currentQuestion.text">
        <QuizOptions
          :model-value="currentAnswer"
          :options="currentQuestion.options"
          @update:model-value="handleAnswer"
        />
      </QuizQuestion>

      <!-- Navigation Actions -->
      <QuizNavigation
        :is-first="isFirstQuestion"
        :is-last="isLastQuestion"
        :has-answer="!!currentAnswer"
        @prev="prevQuestion"
        @next="handleNext"
        @submit="handleSubmit"
      />
    </div>

    <!-- Result Section -->
    <div v-else class="flex w-full flex-col items-center">
      <QuizResult v-if="result" :result="result" @restart="handleRestart" />
    </div>
  </div>
</template>
