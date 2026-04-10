<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

const strings = useAppStrings()

const features = computed(() => {
  const icons = [
    '/images/mnrji1am-2zhfhzt.svg',
    '/images/mnrji1an-qguh91c.svg',
    '/images/mnrji1an-4dkzqyd.svg'
  ]
  return strings.value.home.features.items.map((item, i) => ({
    ...item,
    icon: icons[i] ?? icons[0]
  }))
})
</script>

<template>
  <UContainer class="py-24 sm:py-32">
    <div class="mb-16 text-center">
      <h2 class="text-3xl font-bold tracking-tight text-[color:var(--sbti-text)] sm:text-5xl">
        {{ strings.home.features.heading }}
      </h2>
      <p class="mt-4 text-lg text-[color:var(--sbti-text-muted)]">
        {{ strings.home.features.sub }}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <UCard
        v-for="feature in features"
        :key="feature.title"
        :ui="{
          root: 'bg-[color:var(--sbti-elevated)] ring-1 ring-white/5 rounded-2xl dark:ring-white/5'
        }"
        class="transition-all duration-300 hover:shadow-[0_0_30px_color-mix(in_oklch,var(--sbti-accent)_12%,transparent)]"
      >
        <div class="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/5">
          <img :src="feature.icon" :alt="feature.title" class="size-6" />
        </div>
        <h3 class="mb-3 text-xl font-bold text-[color:var(--sbti-text)]">
          {{ feature.title }}
        </h3>
        <p class="text-sm leading-relaxed text-[color:var(--sbti-text-muted)]">
          {{ feature.description }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
