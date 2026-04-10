<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'
import { formatQuizResultForExport } from '~/utils/formatSbtiResult'
import type { QuizResultPayload } from '~/types/quiz-result'

const props = defineProps<{
  result: QuizResultPayload
}>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()

const strings = useAppStrings()
const toast = useToast()

const handleCopy = async () => {
  if (!import.meta.client) return
  const text = formatQuizResultForExport(props.result, 'plain')
  try {
    await navigator.clipboard.writeText(text)
    toast.add({
      title: strings.value.result.copiedTitle,
      description: strings.value.result.copiedDesc,
      color: 'primary',
      icon: 'i-heroicons-clipboard-document-check'
    })
  } catch {
    toast.add({
      title: strings.value.result.copyFailTitle,
      description: strings.value.result.copyFailDesc,
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
}
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col items-center text-center">
    <div
      class="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[color:var(--sbti-accent)]/25 bg-[color:var(--sbti-elevated)]"
    >
      <UIcon name="i-heroicons-sparkles" class="h-12 w-12 text-[color:var(--sbti-accent-bright)]" />
    </div>

    <h2 class="mb-3 text-4xl font-bold text-[color:var(--sbti-text)]">
      {{ strings.result.title }}
    </h2>
    <p class="mb-10 text-lg text-[color:var(--sbti-text-muted)]">{{ strings.result.subtitle }}</p>

    <div class="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <UCard
        :ui="{
          root: 'bg-[color:var(--sbti-elevated)] border-white/5 dark:border-white/5'
        }"
      >
        <p
          class="text-xs font-bold tracking-widest text-[color:var(--sbti-accent-bright)] uppercase"
        >
          {{ strings.result.mainLabel }}
        </p>
        <p class="mt-2 text-xl font-bold text-[color:var(--sbti-text)]">
          {{ result.mainTag.name }}
        </p>
        <p class="mt-1 text-sm text-[color:var(--sbti-text-muted)]">
          {{ strings.result.matchPercent(result.mainTag.percent) }}
        </p>
      </UCard>

      <UCard
        :ui="{
          root: 'bg-[color:var(--sbti-elevated)] border-white/5 dark:border-white/5'
        }"
      >
        <p
          class="text-xs font-bold tracking-widest text-[color:var(--sbti-accent-bright)] uppercase"
        >
          {{ strings.result.endingLabel }}
        </p>
        <p class="mt-2 text-[16px] leading-[22px] text-[color:var(--sbti-text)]">
          {{ result.ending }}
        </p>
      </UCard>
    </div>

    <UCard
      :ui="{
        root: 'bg-[color:var(--sbti-elevated)] border-white/5 w-full dark:border-white/5'
      }"
      class="mb-6"
    >
      <p
        class="mb-4 text-left text-xs font-bold tracking-widest text-[color:var(--sbti-accent-bright)] uppercase"
      >
        {{ strings.result.topLabel }}
      </p>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div
          v-for="t in result.topTags"
          :key="t.name"
          class="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3"
        >
          <span class="text-[15px] font-semibold text-[color:var(--sbti-text)]">{{ t.name }}</span>
          <span class="font-mono text-[13px] text-[color:var(--sbti-accent-bright)]"
            >{{ t.percent }}%</span
          >
        </div>
      </div>
    </UCard>

    <UCard
      :ui="{
        root: 'bg-[color:var(--sbti-elevated)] border-white/5 w-full dark:border-white/5'
      }"
      class="mb-10"
    >
      <p
        class="mb-4 text-left text-xs font-bold tracking-widest text-[color:var(--sbti-accent-bright)] uppercase"
      >
        {{ strings.result.eggsLabel }}
      </p>
      <div v-if="result.hiddenEggs.length" class="flex flex-col gap-2 text-left">
        <div
          v-for="egg in result.hiddenEggs"
          :key="egg"
          class="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-[15px] text-[color:var(--sbti-text)]"
        >
          {{ egg }}
        </div>
      </div>
      <div v-else class="text-left text-[15px] text-[color:var(--sbti-text-muted)]">
        {{ strings.result.eggsEmpty }}
      </div>
    </UCard>

    <div class="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
      <UButton
        size="xl"
        color="primary"
        class="rounded-full px-10 font-bold"
        @click="emit('restart')"
      >
        {{ strings.result.restart }}
      </UButton>
      <UButton
        size="xl"
        color="neutral"
        variant="ghost"
        to="/"
        class="rounded-full px-10 font-bold text-[color:var(--sbti-text-muted)]"
      >
        {{ strings.result.backHome }}
      </UButton>
      <UButton
        size="xl"
        color="neutral"
        variant="outline"
        class="rounded-full px-10 font-bold"
        @click="handleCopy"
      >
        {{ strings.result.copy }}
      </UButton>
    </div>
  </div>
</template>
