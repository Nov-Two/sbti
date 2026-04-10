<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

const strings = useAppStrings()

const bullets = computed(() => {
  const icon = '/images/mnrji1an-wtm9pfp.svg'
  return strings.value.home.details.bullets.map(b => ({
    ...b,
    icon
  }))
})
</script>

<template>
  <UContainer class="py-24 sm:py-32">
    <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
      <div class="space-y-12">
        <h2
          class="text-3xl leading-tight font-bold tracking-tight text-[color:var(--sbti-text)] sm:text-4xl"
        >
          {{ strings.home.details.heading }}
        </h2>

        <div class="space-y-8">
          <div v-for="bullet in bullets" :key="bullet.title" class="flex gap-4">
            <div class="mt-1 flex-shrink-0">
              <img
                :src="bullet.icon"
                :alt="bullet.title"
                class="size-6 text-[color:var(--sbti-accent)]"
              />
            </div>
            <div>
              <h4 class="mb-1 text-lg font-bold text-[color:var(--sbti-text)]">
                {{ bullet.title }}
              </h4>
              <p class="text-sm leading-relaxed text-[color:var(--sbti-text-muted)]">
                {{ bullet.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative w-full rounded-2xl border border-white/5 bg-[color:var(--sbti-elevated)] p-8 shadow-2xl"
      >
        <div class="mb-8 space-y-4">
          <div class="flex items-center gap-4">
            <div class="h-2 w-full rounded-full bg-[color:var(--sbti-border-subtle)]" />
            <div class="size-4 shrink-0 rounded-full bg-[color:var(--sbti-accent)]" />
          </div>
          <div class="h-2 w-3/4 rounded-full bg-[color:var(--sbti-border-subtle)]" />
          <div class="h-2 w-1/2 rounded-full bg-[color:var(--sbti-border-subtle)]" />
          <div class="mt-6 grid grid-cols-4 gap-4">
            <div class="h-12 rounded bg-[color:var(--sbti-accent)]" />
            <div class="h-12 rounded bg-[color:var(--sbti-accent)]/50" />
            <div class="h-12 rounded bg-[color:var(--sbti-accent)]/30" />
            <div class="h-12 rounded bg-[color:var(--sbti-accent)]/80" />
          </div>
        </div>

        <div>
          <p
            class="mb-2 text-xs font-bold tracking-widest text-[color:var(--sbti-accent)] uppercase"
          >
            {{ strings.home.details.cardKicker }}
          </p>
          <p class="text-lg leading-snug font-bold text-[color:var(--sbti-text)]">
            {{ strings.home.details.cardBody }}
          </p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
