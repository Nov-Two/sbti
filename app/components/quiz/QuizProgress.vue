<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

defineProps<{
  currentStep: number
  totalSteps: number
  category: string
  progress: number
}>()

const strings = useAppStrings()
</script>

<template>
  <div class="mb-12 w-full max-w-3xl">
    <div class="mb-4 flex items-end justify-between">
      <div class="flex flex-col">
        <span
          class="font-mono text-[12px] tracking-[1.2px] text-[color:var(--sbti-accent)] uppercase"
        >
          {{ strings.quiz.stepLabel(currentStep, totalSteps) }}
        </span>
        <h2 class="mt-1 text-[20px] font-bold text-[color:var(--sbti-text)]">
          {{ category }}
        </h2>
      </div>
      <span class="font-mono text-[12px] text-[color:var(--sbti-text-dim)]">
        {{ strings.quiz.percentComplete(progress) }}
      </span>
    </div>
    <div class="h-[6px] w-full overflow-hidden rounded-full bg-[color:var(--sbti-border-subtle)]">
      <div
        class="h-full rounded-full shadow-[0_0_12px_color-mix(in_oklch,var(--sbti-accent-bright)_40%,transparent)] transition-all duration-300"
        :style="{ width: `${progress}%`, backgroundColor: 'var(--sbti-accent-bright)' }"
      />
    </div>
  </div>
</template>
