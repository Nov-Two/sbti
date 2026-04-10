<script setup lang="ts">
/**
 * 测验页专用：内置题库下拉、上传 .md 追加自定义题库、删除条目、示例 Markdown 弹窗。
 */
import { nextTick } from 'vue'
import { quizSampleMdPlaceholder } from '~/data/quizSampleMd'
import { useAppStrings } from '~/composables/useAppStrings'
import { useQuizBank } from '~/composables/useQuizBank'
import { useCustomQuiz } from '~/composables/useCustomQuiz'
import type { QuizBankId } from '~/types/quiz'

const strings = useAppStrings()
const toast = useToast()
const { bankId, setBankId } = useQuizBank()
const custom = useCustomQuiz()
const fileRef = ref<HTMLInputElement | null>(null)
const sampleOpen = ref(false)

const bankItems = computed(() => {
  const u = strings.value.ui
  const items: { label: string; value: string }[] = [
    { label: u.quizBankSbti, value: 'sbti' },
    { label: u.quizBankYouth, value: 'youth-stress' }
  ]
  for (const e of custom.entries.value) {
    items.push({ label: e.label, value: `custom:${e.id}` })
  }
  return items
})

const bankModel = computed({
  get: () => bankId.value as string,
  set: (v: string | undefined) => {
    if (v) setBankId(v as QuizBankId)
  }
})

const triggerUpload = () => {
  fileRef.value?.click()
}

const onFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (!file.name.toLowerCase().endsWith('.md')) {
    toast.add({
      title: strings.value.quiz.uploadWrongFileTitle,
      description: strings.value.quiz.uploadWrongFileDesc,
      color: 'warning',
      icon: 'i-heroicons-exclamation-triangle'
    })
    return
  }
  const text = await file.text()
  const r = custom.loadFromMarkdown(text, n => strings.value.quiz.customBankLabel(n))
  if (!r.ok) {
    toast.add({
      title: strings.value.quiz.parseFailTitle,
      description: r.errors.join('\n'),
      color: 'error',
      icon: 'i-heroicons-x-circle',
      duration: 12_000
    })
    return
  }
  await nextTick()
  setBankId(r.bankId)
  toast.add({
    title: strings.value.quiz.customLoadedTitle,
    description: strings.value.quiz.customLoadedDesc,
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })
}

const deleteEntry = (entryId: string, label: string) => {
  const key = `custom:${entryId}` as QuizBankId
  custom.removeEntry(entryId)
  if ((bankId.value as string) === key) {
    setBankId('sbti')
  }
  toast.add({
    title: strings.value.quiz.customDeletedTitle(label),
    color: 'neutral',
    icon: 'i-heroicons-trash'
  })
}

onMounted(() => {
  custom.migrateV1IfNeeded()
})
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col gap-3">
    <div
      class="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3"
    >
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <span class="shrink-0 text-xs font-semibold text-[color:var(--sbti-text-muted)] uppercase">
          {{ strings.ui.quizBank }}
        </span>
        <USelectMenu
          v-model="bankModel"
          :items="bankItems"
          value-key="value"
          label-key="label"
          size="sm"
          :search-input="false"
          :placeholder="strings.ui.quizBank"
          class="max-w-[min(100%,16rem)] min-w-[10rem]"
          :ui="{ content: 'min-w-[14rem]' }"
        />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <p class="max-w-full text-xs text-[color:var(--sbti-text-muted)]">
          {{ strings.ui.quizUploadHint }}
        </p>
        <UButton size="sm" color="neutral" variant="outline" @click="triggerUpload">
          {{ strings.ui.quizUploadMd }}
        </UButton>
        <UButton size="sm" color="neutral" variant="soft" @click="sampleOpen = true">
          {{ strings.ui.quizCreateSample }}
        </UButton>
        <input
          ref="fileRef"
          type="file"
          accept=".md,.markdown,text/markdown"
          class="sr-only"
          tabindex="-1"
          @change="onFileChange"
        />
      </div>
    </div>

    <ul
      v-if="custom.entries.length > 0"
      class="flex flex-col gap-1.5 rounded-lg border border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-elevated)]/40 px-3 py-2 text-sm"
    >
      <li v-for="e in custom.entries" :key="e.id" class="flex items-center justify-between gap-2">
        <span class="min-w-0 truncate text-[color:var(--sbti-text)]">{{ e.label }}</span>
        <UButton
          size="xs"
          color="neutral"
          variant="ghost"
          class="shrink-0"
          @click="deleteEntry(e.id, e.label)"
        >
          {{ strings.ui.quizDeleteOne }}
        </UButton>
      </li>
    </ul>

    <Teleport to="body">
      <div
        v-if="sampleOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="strings.ui.quizSampleTitle"
        @click.self="sampleOpen = false"
      >
        <div
          class="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-page-bg)] shadow-xl"
          @click.stop
        >
          <div
            class="flex items-center justify-between border-b border-[color:var(--sbti-border-subtle)] px-4 py-3"
          >
            <h3 class="text-base font-semibold text-[color:var(--sbti-text)]">
              {{ strings.ui.quizSampleTitle }}
            </h3>
            <UButton color="neutral" variant="ghost" size="sm" @click="sampleOpen = false">
              {{ strings.ui.quizSampleClose }}
            </UButton>
          </div>
          <div class="min-h-0 flex-1 overflow-auto px-4 py-3">
            <pre
              class="font-mono text-xs leading-relaxed break-words whitespace-pre-wrap text-[color:var(--sbti-text)]"
              >{{ quizSampleMdPlaceholder }}</pre
            >
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
