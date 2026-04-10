<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  options: Record<string, string>
  optionOrder: readonly string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const buttonClass = (key: string) => {
  const isSelected = props.modelValue === key
  return isSelected
    ? 'border-[color:var(--sbti-accent)] bg-[color:var(--sbti-accent)] text-[color:var(--sbti-on-accent)] shadow-[0_0_24px_color-mix(in_oklch,var(--sbti-accent)_45%,transparent)]'
    : 'border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-elevated)]/40 text-[color:var(--sbti-text)] hover:border-[color:var(--sbti-accent)]/60 hover:bg-[color:var(--sbti-elevated)]/80'
}

const badgeClass = (key: string) => {
  const isSelected = props.modelValue === key
  return isSelected
    ? 'bg-[color:var(--sbti-page-bg)] text-[color:var(--sbti-accent)] ring-[color:var(--sbti-on-accent)]'
    : 'bg-[color:var(--sbti-page-bg)] text-[color:var(--sbti-text-dim)] ring-[color:var(--sbti-border-subtle)]'
}
</script>

<template>
  <div class="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
    <button
      v-for="key in optionOrder"
      :key="key"
      class="group relative flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--sbti-ring)]"
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
        {{ options[key] }}
      </span>

      <span class="mt-1 flex h-6 w-6 items-center justify-center">
        <UIcon
          v-if="modelValue === key"
          name="i-heroicons-check-circle"
          class="h-6 w-6 text-[color:var(--sbti-on-accent)]"
        />
        <UIcon
          v-else
          name="i-heroicons-circle-stack"
          class="h-6 w-6 text-[color:var(--sbti-text-dim)]"
        />
      </span>
    </button>
  </div>
</template>
