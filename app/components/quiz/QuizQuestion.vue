<script setup lang="ts">
import { motion } from 'motion-v'

defineProps<{
  questionText: string
}>()
</script>

<template>
  <div
    class="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-elevated)]/55 p-8 backdrop-blur-[10px] sm:p-16"
  >
    <div
      class="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-[32px]"
      :class="'bg-[color:var(--sbti-accent-bright)]/8'"
    />

    <div class="relative z-10 flex flex-col items-center">
      <div class="mb-6 flex h-10 w-10 items-center justify-center">
        <UIcon
          name="i-heroicons-light-bulb"
          class="h-8 w-8 text-[color:var(--sbti-accent-bright)]"
        />
      </div>

      <motion.div
        :key="questionText"
        initial="{ opacity: 0, y: 10 }"
        animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4 }"
        class="mb-10 w-full text-center"
      >
        <h3
          class="text-[24px] leading-[1.2] font-bold text-[color:var(--sbti-text)] sm:text-[30px]"
        >
          {{ questionText }}
        </h3>
      </motion.div>

      <slot />
    </div>
  </div>
</template>
