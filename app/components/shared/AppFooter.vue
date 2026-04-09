<script setup lang="ts">
const links = [
  { label: 'GitHub', to: 'https://github.com/Nov-Two/sbti', target: '_blank' },
  { label: 'Privacy', to: '#' },
  { label: 'Terms', to: '#' },
  { label: 'Support', to: '#' }
]
</script>

<template>
  <footer class="border-t border-white/10 bg-[#131316] py-12">
    <UContainer class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-primary-400 text-xl font-bold tracking-tight">SBTI.</span>
        <span class="font-mono text-xs tracking-widest text-slate-500 uppercase"
          >© {{ new Date().getFullYear() }} SBTI. Built with precision.</span
        >
      </div>

      <nav class="flex items-center gap-12">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          :target="link.target"
          :rel="link.target === '_blank' ? 'noopener noreferrer' : undefined"
          class="font-mono text-xs tracking-widest text-slate-500 uppercase underline decoration-slate-600 underline-offset-4 hover:text-slate-400"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </UContainer>
  </footer>
</template>
