<script setup lang="ts">
defineProps<{
  isFirst: boolean
  isLast: boolean
  hasAnswer: boolean
}>()

defineEmits<{
  (e: 'prev' | 'next' | 'submit'): void
}>()
</script>

<template>
  <div class="mt-12 flex w-full max-w-3xl items-center justify-between px-4">
    <!-- Previous Button -->
    <UButton
      v-if="!isFirst"
      color="neutral"
      variant="ghost"
      size="lg"
      class="flex items-center gap-2 font-mono text-[14px] text-[#94a3b8] transition-colors hover:text-[#c1cab0]"
      @click="$emit('prev')"
    >
      <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
      Previous
    </UButton>
    <div v-else class="w-10" />

    <!-- Next / Submit Button -->
    <UButton
      v-if="!isLast"
      color="primary"
      size="xl"
      class="relative h-14 min-w-[210px] items-center justify-between rounded-full bg-[linear-gradient(133.83deg,#9ee939_1.13%,#84cc16_98.87%)] px-10 text-[16px] font-bold text-[#1f3700] shadow-[0_10px_15px_-3px_rgba(158,233,57,0.2)] transition-transform hover:-translate-y-px active:translate-y-0 disabled:opacity-50"
      :disabled="!hasAnswer"
      @click="$emit('next')"
    >
      <span>Next Question</span>
      <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
    </UButton>

    <UButton
      v-else
      color="primary"
      size="xl"
      class="relative h-14 min-w-[210px] items-center justify-between rounded-full bg-[linear-gradient(133.83deg,#9ee939_1.13%,#84cc16_98.87%)] px-10 text-[16px] font-bold text-[#1f3700] shadow-[0_10px_15px_-3px_rgba(158,233,57,0.2)] transition-transform hover:-translate-y-px active:translate-y-0 disabled:opacity-50"
      :disabled="!hasAnswer"
      @click="$emit('submit')"
    >
      <span>View Results</span>
      <UIcon name="i-heroicons-sparkles" class="h-4 w-4" />
    </UButton>
  </div>
</template>
