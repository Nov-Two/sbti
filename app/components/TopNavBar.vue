<script setup lang="ts">
const items = [
  { label: 'Home', to: '/', active: true },
  { label: 'Test', to: '/test' },
  { label: 'About', to: '/about' }
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/5 bg-[#131316]/90 backdrop-blur-md">
    <UContainer class="flex h-[65px] items-center justify-between">
      <!-- Logo & Brand -->
      <NuxtLink to="/" class="flex items-center gap-4">
        <img src="/images/mnrji0t1-4b9lk5f.png" alt="SBTI Logo" class="size-8 overflow-hidden rounded-md" />
        <span class="text-2xl font-bold tracking-tight text-primary-400">SBTI</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex items-center gap-8">
        <NuxtLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="relative text-base font-semibold transition-colors"
          :class="item.active ? 'text-primary-400' : 'text-slate-400 hover:text-slate-300'"
        >
          {{ item.label }}
          <span
            v-if="item.active"
            class="absolute -bottom-1 left-0 h-[2px] w-full bg-primary-400"
          />
        </NuxtLink>
      </nav>
    </UContainer>
  </header>
</template>
