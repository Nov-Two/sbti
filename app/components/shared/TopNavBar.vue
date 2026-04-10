<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

const route = useRoute()
const app = useAppConfig()
const strings = useAppStrings()

const items = computed(() => [
  { label: strings.value.nav.home, to: '/', active: route.path === '/' },
  { label: strings.value.nav.test, to: '/test', active: route.path === '/test' },
  { label: strings.value.nav.about, to: '/about', active: route.path === '/about' }
])
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b backdrop-blur-[12px]"
    :class="'border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-nav-bg)]'"
  >
    <div class="sbti-container flex h-[65px] items-center justify-between gap-3">
      <NuxtLink
        to="/"
        class="flex min-h-12 shrink-0 items-center gap-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--sbti-ring)]"
      >
        <span
          class="text-[24px] leading-[32px] font-bold tracking-[-1.2px] text-[color:var(--sbti-accent)]"
        >
          {{ app.site.name }}
        </span>
      </NuxtLink>

      <nav class="sbti-nav-desktop mx-auto flex min-w-0 flex-1 items-center justify-center gap-8">
        <NuxtLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="relative inline-flex min-h-12 items-center justify-center rounded-sm px-2 text-[16px] leading-[24px] tracking-[-0.4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--sbti-ring)]"
          :class="
            item.active
              ? 'pb-[2px] font-semibold text-[color:var(--sbti-accent)]'
              : 'font-normal text-[color:var(--sbti-text-muted)] hover:text-[color:var(--sbti-text)]'
          "
        >
          {{ item.label }}
          <span
            v-if="item.active"
            class="absolute bottom-0 left-0 h-[2px] w-full bg-[color:var(--sbti-accent)]"
          />
        </NuxtLink>
      </nav>

      <div class="flex shrink-0 items-center gap-2">
        <AppLocaleThemeControls />

        <div class="sbti-nav-mobile relative">
          <details class="group">
            <summary
              class="flex min-h-12 list-none items-center justify-center rounded-[10px] border px-4 text-[16px] leading-[24px] font-semibold tracking-[-0.4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--sbti-ring)]"
              :class="'border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-elevated)] text-[color:var(--sbti-text)]'"
            >
              {{ strings.nav.menu }}
            </summary>
            <div
              class="absolute top-[56px] right-0 z-50 w-[200px] rounded-[12px] border p-2 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.5)]"
              :class="'border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-elevated)]'"
            >
              <NuxtLink
                v-for="item in items"
                :key="item.label"
                :to="item.to"
                class="flex min-h-12 items-center rounded-[10px] px-3 text-[16px] leading-[24px] tracking-[-0.4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--sbti-ring)]"
                :class="
                  item.active
                    ? 'bg-[color:var(--sbti-border-subtle)] font-semibold text-[color:var(--sbti-accent)]'
                    : 'font-normal text-[color:var(--sbti-text-muted)] hover:bg-[color:var(--sbti-border-subtle)] hover:text-[color:var(--sbti-text)]'
                "
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </details>
        </div>
      </div>
    </div>
  </header>
</template>
