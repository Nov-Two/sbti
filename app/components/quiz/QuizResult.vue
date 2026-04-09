<script setup lang="ts">
import type { SbtiResult } from '~/utils/sbti'

const props = defineProps<{
  result: SbtiResult
}>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()

const toast = useToast()

const handleCopy = async () => {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(props.result.fullText)
    toast.add({
      title: '已复制',
      description: '结果已复制到剪贴板',
      color: 'primary',
      icon: 'i-heroicons-clipboard-document-check'
    })
  } catch {
    toast.add({
      title: '复制失败',
      description: '浏览器不支持剪贴板或未授权',
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle'
    })
  }
}
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col items-center text-center">
    <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#9ee9391a]">
      <UIcon name="i-heroicons-sparkles" class="h-12 w-12 text-[#9ee939]" />
    </div>

    <h2 class="mb-3 text-4xl font-bold text-white">鉴定完成</h2>
    <p class="mb-10 text-lg text-[#94a3b8]">你以为你是来测人格的，实际上你是在被人格测。</p>

    <div class="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <UCard :ui="{ root: 'bg-[#17181B] border-white/5' }">
        <p class="text-xs font-bold tracking-widest text-[#9ee939] uppercase">主标签</p>
        <p class="mt-2 text-xl font-bold text-white">
          {{ result.mainTag.name }}
        </p>
        <p class="mt-1 text-sm text-[#94a3b8]">匹配度 {{ result.mainTag.percent }}%</p>
      </UCard>

      <UCard :ui="{ root: 'bg-[#17181B] border-white/5' }">
        <p class="text-xs font-bold tracking-widest text-[#9ee939] uppercase">结尾语</p>
        <p class="mt-2 text-[16px] leading-[22px] text-white">
          {{ result.ending }}
        </p>
      </UCard>
    </div>

    <UCard :ui="{ root: 'bg-[#17181B] border-white/5 w-full' }" class="mb-6">
      <p class="mb-4 text-left text-xs font-bold tracking-widest text-[#9ee939] uppercase">
        TOP 标签排行
      </p>
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div
          v-for="t in result.topTags"
          :key="t.name"
          class="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3"
        >
          <span class="text-[15px] font-semibold text-white">{{ t.name }}</span>
          <span class="font-mono text-[13px] text-[#9ee939]">{{ t.percent }}%</span>
        </div>
      </div>
    </UCard>

    <UCard :ui="{ root: 'bg-[#17181B] border-white/5 w-full' }" class="mb-10">
      <p class="mb-4 text-left text-xs font-bold tracking-widest text-[#9ee939] uppercase">
        隐藏彩蛋
      </p>
      <div v-if="result.hiddenEggs.length" class="flex flex-col gap-2 text-left">
        <div
          v-for="egg in result.hiddenEggs"
          :key="egg"
          class="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-[15px] text-white"
        >
          {{ egg }}
        </div>
      </div>
      <div v-else class="text-left text-[15px] text-[#94a3b8]">无（说明你还没到极致）</div>
    </UCard>

    <div class="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
      <UButton
        size="xl"
        color="primary"
        class="rounded-full px-10 font-bold"
        @click="emit('restart')"
      >
        重新测一次
      </UButton>
      <UButton
        size="xl"
        color="neutral"
        variant="ghost"
        to="/"
        class="rounded-full px-10 font-bold text-[#94a3b8]"
      >
        返回首页
      </UButton>
      <UButton
        size="xl"
        color="neutral"
        variant="outline"
        class="rounded-full px-10 font-bold"
        @click="handleCopy"
      >
        复制结果
      </UButton>
    </div>
  </div>
</template>
