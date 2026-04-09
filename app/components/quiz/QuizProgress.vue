<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
  category: string
  progress: number
}>()
</script>

<template>
  <div class="mb-12 w-full max-w-3xl">
    <div class="mb-4 flex items-end justify-between">
      <div class="flex flex-col">
        <span class="font-mono text-[12px] tracking-[1.2px] text-[#84cc16] uppercase">
          Step {{ currentStep }} of {{ totalSteps }}
        </span>
        <h2 class="mt-1 text-[20px] font-bold text-[#e4e1e6]">
          {{ category }}
        </h2>
      </div>
      <span class="font-mono text-[12px] text-[#64748b]">
        {{ Math.round(progress) }}% Complete
      </span>
    </div>
    <div class="h-[6px] w-full overflow-hidden rounded-full bg-[#353438]">
      <div
        class="h-full rounded-full bg-[#9ee939] shadow-[0_0_12px_rgba(132,204,22,0.4)] transition-all duration-300"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>
