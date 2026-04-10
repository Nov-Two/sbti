<script setup lang="ts">
/**
 * 顶栏：语言（Popover 按钮组）与外观（明暗 + 强调色），不含题库切换（题库仅在测验页）。
 */
import { useAppStrings } from '~/composables/useAppStrings'
import { useAppLocale } from '~/composables/useAppLocale'
import { accentIds, useAccentTheme, type AccentId } from '~/composables/useAccentTheme'

const strings = useAppStrings()
const { locale, setLocale } = useAppLocale()
const { accent, setAccent } = useAccentTheme()
const colorMode = useColorMode()

const accentPreview: Record<AccentId, string> = {
  lime: '#84cc16',
  violet: '#8b5cf6',
  cyan: '#06b6d4',
  amber: '#f59e0b'
}

const accentName = (id: AccentId) => {
  const u = strings.value.ui
  const m = { lime: u.accentLime, violet: u.accentViolet, cyan: u.accentCyan, amber: u.accentAmber }
  return m[id]
}

const setMode = (pref: 'light' | 'dark' | 'system') => {
  colorMode.preference = pref
}
</script>

<template>
  <div class="flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2">
    <UPopover
      :content="{ side: 'bottom', align: 'end', sideOffset: 8 }"
      :ui="{ content: 'w-[min(100vw-2rem,20rem)] p-4' }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        square
        class="min-h-9 min-w-9 shrink-0 text-[color:var(--sbti-text-muted)] hover:text-[color:var(--sbti-text)]"
        :aria-label="strings.ui.languageMenu"
      >
        <UIcon name="i-heroicons-language" class="size-5" />
      </UButton>

      <template #content>
        <div class="flex flex-col gap-4">
          <p
            class="text-xs font-semibold tracking-wide text-[color:var(--sbti-text-muted)] uppercase"
          >
            {{ strings.ui.language }}
          </p>
          <div class="grid grid-cols-2 gap-1.5">
            <UButton
              size="sm"
              :variant="locale === 'zh-CN' ? 'solid' : 'outline'"
              color="neutral"
              class="justify-center"
              @click="setLocale('zh-CN')"
            >
              {{ strings.ui.langZh }}
            </UButton>
            <UButton
              size="sm"
              :variant="locale === 'en-US' ? 'solid' : 'outline'"
              color="neutral"
              class="justify-center"
              @click="setLocale('en-US')"
            >
              {{ strings.ui.langEn }}
            </UButton>
          </div>
        </div>
      </template>
    </UPopover>

    <UPopover
      :content="{ side: 'bottom', align: 'end', sideOffset: 8 }"
      :ui="{ content: 'w-[min(100vw-2rem,20rem)] p-4' }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        square
        class="min-h-9 min-w-9 shrink-0 text-[color:var(--sbti-text-muted)] hover:text-[color:var(--sbti-text)]"
        :aria-label="strings.ui.themeMenu"
      >
        <UIcon name="i-heroicons-swatch" class="size-5" />
      </UButton>

      <template #content>
        <div class="flex flex-col gap-4">
          <p
            class="text-xs font-semibold tracking-wide text-[color:var(--sbti-text-muted)] uppercase"
          >
            {{ strings.ui.appearance }}
          </p>
          <div class="grid grid-cols-3 gap-1.5">
            <UButton
              size="sm"
              :variant="colorMode.preference === 'light' ? 'solid' : 'outline'"
              color="neutral"
              class="justify-center"
              @click="setMode('light')"
            >
              {{ strings.ui.modeLight }}
            </UButton>
            <UButton
              size="sm"
              :variant="colorMode.preference === 'dark' ? 'solid' : 'outline'"
              color="neutral"
              class="justify-center"
              @click="setMode('dark')"
            >
              {{ strings.ui.modeDark }}
            </UButton>
            <UButton
              size="sm"
              :variant="colorMode.preference === 'system' ? 'solid' : 'outline'"
              color="neutral"
              class="justify-center"
              @click="setMode('system')"
            >
              {{ strings.ui.modeSystem }}
            </UButton>
          </div>

          <p
            class="text-xs font-semibold tracking-wide text-[color:var(--sbti-text-muted)] uppercase"
          >
            {{ strings.ui.accent }}
          </p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="id in accentIds"
              :key="id"
              type="button"
              class="flex flex-col items-center gap-1 rounded-lg p-1.5 ring-offset-2 ring-offset-[color:var(--sbti-page-bg)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--sbti-ring)]"
              :class="accent === id ? 'ring-2 ring-[color:var(--sbti-accent)]' : 'ring-0'"
              @click="setAccent(id)"
            >
              <span
                class="size-8 rounded-full shadow-inner ring-1 ring-black/10"
                :style="{ backgroundColor: accentPreview[id] }"
              />
              <span
                class="max-w-full truncate text-center text-[10px] text-[color:var(--sbti-text-muted)]"
              >
                {{ accentName(id) }}
              </span>
            </button>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
