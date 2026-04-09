<script setup lang="ts">
import type { SbtiOption } from '~/data/sbti/questions'

const props = defineProps<{
  modelValue?: SbtiOption
  options: Record<SbtiOption, string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SbtiOption): void
}>()

const optionKeys: SbtiOption[] = ['A', 'B', 'C', 'D']

const buttonClass = (key: SbtiOption) => {
  const isSelected = props.modelValue === key
  return isSelected
    ? 'border-[#84cc16] bg-[#84cc16] text-[#1f3700] shadow-[0_0_24px_rgba(132,204,22,0.7)]'
    : 'border-[#4249364d] bg-[#17181b66] text-[#e4e1e6] hover:border-[#84cc1699] hover:bg-[#17181bcc]'
}

const badgeClass = (key: SbtiOption) => {
  const isSelected = props.modelValue === key
  return isSelected
    ? 'bg-[#101114] text-[#84cc16] ring-[#1f3700]'
    : 'bg-[#101114] text-[#64748b] ring-[#4249364d]'
}
</script>

<template>
  <div class="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
    <button
      v-for="key in optionKeys"
      :key="key"
      class="group relative flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ee939]"
      :class="buttonClass(key)"
      @click="emit('update:modelValue', key)"
    >
      <span
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-[14px] font-bold ring-1"
        :class="badgeClass(key)"
      >
        {{ key }}
      </span>

      <span class="flex-1 text-[16px] leading-[22px]">
        {{ props.options[key] }}
      </span>

      <span class="mt-1 flex h-6 w-6 items-center justify-center">
        <UIcon
          v-if="props.modelValue === key"
          name="i-heroicons-check-circle"
          class="h-6 w-6 text-[#1f3700]"
        />
        <UIcon v-else name="i-heroicons-circle-stack" class="h-6 w-6 text-[#424936]" />
      </span>
    </button>
  </div>
</template>
