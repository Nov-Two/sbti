<script setup lang="ts">
const links = [
  { label: 'Privacy', to: '#' },
  { label: 'Terms', to: '#' },
  { label: 'Support', to: '#' }
]
</script>

<template>
  <footer class="border-t border-white/10 bg-[#131316] py-12">
    <UContainer class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold tracking-tight text-primary-400">SBTI.</span>
        <span class="text-xs uppercase tracking-widest text-slate-500 font-mono">© {{ new Date().getFullYear() }} SBTI. Built with precision.</span>
      </div>

      <nav class="flex items-center gap-12">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-slate-400 underline decoration-slate-600 underline-offset-4"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </UContainer>
  </footer>
</template>
