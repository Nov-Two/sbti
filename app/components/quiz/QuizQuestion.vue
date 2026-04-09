<script setup lang="ts">
import { motion } from 'motion-v'

defineProps<{
  questionText: string
}>()
</script>

<template>
  <div
    class="relative w-full max-w-3xl overflow-hidden rounded-[32px] bg-[#35343899] p-8 backdrop-blur-[10px] sm:p-16"
  >
    <!-- Background glow effect -->
    <div
      class="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9ee9390d] blur-[32px]"
    />

    <div class="relative z-10 flex flex-col items-center">
      <!-- Icon -->
      <div class="mb-6 flex h-10 w-10 items-center justify-center">
        <UIcon name="i-heroicons-light-bulb" class="h-8 w-8 text-[#9ee939]" />
      </div>

      <!-- Question Text -->
      <motion.div
        :key="questionText"
        initial="{ opacity: 0, y: 10 }"
        animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4 }"
        class="mb-10 w-full text-center"
      >
        <h3 class="text-[24px] leading-[1.2] font-bold text-[#e4e1e6] sm:text-[30px]">
          {{ questionText }}
        </h3>
      </motion.div>

      <!-- Slot for Options -->
      <slot />
    </div>
  </div>
</template>
