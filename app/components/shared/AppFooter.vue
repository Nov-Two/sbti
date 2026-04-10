<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

const app = useAppConfig()
const strings = useAppStrings()

const links = computed(() => [
  { label: strings.value.footer.github, to: app.site.githubUrl, target: '_blank' },
  { label: strings.value.footer.privacy, to: '#' },
  { label: strings.value.footer.terms, to: '#' },
  { label: strings.value.footer.support, to: '#' }
])
</script>

<template>
  <footer class="border-t border-white/10 bg-[color:var(--sbti-surface)] py-12">
    <UContainer class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold tracking-tight text-[color:var(--sbti-accent)]"
          >{{ app.site.name }}.</span
        >
        <span class="font-mono text-xs tracking-widest text-[color:var(--sbti-text-dim)] uppercase"
          >© {{ new Date().getFullYear() }} {{ strings.site.copyrightSuffix }}
          {{ strings.site.footerTagline }}</span
        >
      </div>

      <nav class="flex flex-wrap items-center gap-6 sm:gap-12">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          :target="link.target"
          :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined"
          class="font-mono text-xs tracking-widest text-[color:var(--sbti-text-dim)] uppercase underline decoration-slate-600 underline-offset-4 hover:text-[color:var(--sbti-text-muted)]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </UContainer>
  </footer>
</template>
