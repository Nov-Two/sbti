<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

defineProps<{
  isFirst: boolean
  isLast: boolean
  hasAnswer: boolean
}>()

defineEmits<{
  (e: 'prev' | 'next' | 'submit'): void
}>()

const strings = useAppStrings()
</script>

<template>
  <div class="mt-12 flex w-full max-w-3xl items-center justify-between px-4">
    <UButton
      v-if="!isFirst"
      color="neutral"
      variant="ghost"
      size="lg"
      class="flex items-center gap-2 font-mono text-[14px] text-[color:var(--sbti-text-muted)] transition-colors hover:text-[color:var(--sbti-text)]"
      @click="$emit('prev')"
    >
      <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
      {{ strings.quiz.previous }}
    </UButton>
    <div v-else class="w-10" />

    <UButton
      v-if="!isLast"
      color="primary"
      size="xl"
      class="relative h-14 min-w-[210px] items-center justify-between rounded-full px-10 text-[16px] font-bold shadow-[0_10px_15px_-3px_color-mix(in_oklch,var(--sbti-accent-bright)_20%,transparent)] transition-transform hover:-translate-y-px active:translate-y-0 disabled:opacity-50"
      :class="'bg-[linear-gradient(133.83deg,var(--sbti-accent-bright)_1.13%,var(--sbti-accent)_98.87%)] text-[color:var(--sbti-on-accent)]'"
      :disabled="!hasAnswer"
      @click="$emit('next')"
    >
      <span>{{ strings.quiz.next }}</span>
      <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
    </UButton>

    <UButton
      v-else
      color="primary"
      size="xl"
      class="relative h-14 min-w-[210px] items-center justify-between rounded-full px-10 text-[16px] font-bold shadow-[0_10px_15px_-3px_color-mix(in_oklch,var(--sbti-accent-bright)_20%,transparent)] transition-transform hover:-translate-y-px active:translate-y-0 disabled:opacity-50"
      :class="'bg-[linear-gradient(133.83deg,var(--sbti-accent-bright)_1.13%,var(--sbti-accent)_98.87%)] text-[color:var(--sbti-on-accent)]'"
      :disabled="!hasAnswer"
      @click="$emit('submit')"
    >
      <span>{{ strings.quiz.submit }}</span>
      <UIcon name="i-heroicons-sparkles" class="h-4 w-4" />
    </UButton>
  </div>
</template>
