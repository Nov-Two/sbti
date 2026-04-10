<script setup lang="ts">
import type { AnswerMap, NormalizedQuestion } from '~/types/quiz'

const props = defineProps<{
  questions: NormalizedQuestion<string>[]
  currentIndex: number
  answers: AnswerMap<string>
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
      class="rounded-2xl border p-4 shadow-2xl backdrop-blur-[12px]"
      :class="'border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-elevated)]/60'"
    >
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          v-for="(q, index) in questions"
          :key="q.id"
          class="relative flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-[12px] transition-all duration-200 sm:h-10 sm:w-10 sm:text-[14px]"
          :class="[
            index === currentIndex
              ? 'border-[color:var(--sbti-accent)] bg-[color:var(--sbti-accent)] text-[color:var(--sbti-on-accent)] shadow-[0_0_12px_color-mix(in_oklch,var(--sbti-accent)_40%,transparent)]'
              : isAnswered(q.id)
                ? 'border-[color:var(--sbti-accent)]/30 bg-[color:var(--sbti-accent)]/10 text-[color:var(--sbti-accent)] hover:bg-[color:var(--sbti-accent)]/20'
                : 'border-[color:var(--sbti-border-subtle)] text-[color:var(--sbti-text-dim)] hover:border-[color:var(--sbti-accent)]/50 hover:text-[color:var(--sbti-text)]'
          ]"
          @click="emit('jump', index)"
        >
          {{ index + 1 }}
          <span
            v-if="answerText(q.id)"
            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] ring-1"
            :class="'bg-[color:var(--sbti-page-bg)] text-[color:var(--sbti-accent-bright)] ring-[color:var(--sbti-accent)]/30'"
          >
            {{ answerText(q.id) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
