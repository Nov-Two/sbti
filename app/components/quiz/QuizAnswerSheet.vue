<script setup lang="ts">
import type { AnswerMap, Question } from '~/composables/useQuiz'

const props = defineProps<{
  questions: Question[]
  currentIndex: number
  answers: AnswerMap
}>()

const emit = defineEmits<{
  (e: 'jump', index: number): void
}>()

const isAnswered = (questionId: number) => {
  return props.answers[questionId] !== undefined
}

const answerText = (questionId: number) => {
  return props.answers[questionId]
}
</script>

<template>
  <div class="mb-10 w-full max-w-3xl px-4">
    <div
      class="rounded-2xl border border-[#42493626] bg-[#17181b99] p-4 shadow-2xl backdrop-blur-[12px]"
    >
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          v-for="(q, index) in questions"
          :key="q.id"
          class="relative flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-[12px] transition-all duration-200 sm:h-10 sm:w-10 sm:text-[14px]"
          :class="[
            index === currentIndex
              ? 'border-[#84cc16] bg-[#84cc16] text-[#1f3700] shadow-[0_0_12px_rgba(132,204,22,0.4)]'
              : isAnswered(q.id)
                ? 'border-[#84cc164d] bg-[#84cc161a] text-[#84cc16] hover:bg-[#84cc1633]'
                : 'border-[#4249364d] text-[#64748b] hover:border-[#84cc1699] hover:text-[#e4e1e6]'
          ]"
          @click="emit('jump', index)"
        >
          {{ index + 1 }}
          <span
            v-if="answerText(q.id)"
            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#101114] text-[10px] text-[#9ee939] ring-1 ring-[#84cc164d]"
          >
            {{ answerText(q.id) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
