<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

const strings = useAppStrings()
</script>

<template>
  <UContainer class="py-24 sm:py-32">
    <div
      class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[color:var(--sbti-elevated)] to-[color:var(--sbti-page-bg)] px-6 py-20 text-center shadow-2xl sm:px-16"
    >
      <h2
        class="mx-auto mb-10 max-w-2xl text-4xl font-extrabold tracking-tight text-[color:var(--sbti-text)] sm:text-5xl"
      >
        {{ strings.home.cta.heading }}
      </h2>
      <UButton
        size="xl"
        color="primary"
        to="/test"
        class="rounded-full px-10 font-bold shadow-[0_0_30px_color-mix(in_oklch,var(--sbti-accent-bright)_35%,transparent)] hover:shadow-[0_0_40px_color-mix(in_oklch,var(--sbti-accent-bright)_50%,transparent)]"
      >
        {{ strings.home.cta.button }}
      </UButton>
      <div
        class="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full blur-[100px]"
        :class="'bg-[color:var(--sbti-accent)]/20'"
      />
    </div>
  </UContainer>
</template>
