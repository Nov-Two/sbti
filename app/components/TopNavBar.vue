<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  { label: 'Home', to: '/', active: route.path === '/' },
  // { label: 'Test', to: '/test', active: route.path === '/test' },
  { label: 'About', to: '/about', active: route.path === '/about' }
])
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-[#4249361a] bg-[#131316]/60 backdrop-blur-[12px]"
  >
    <div class="sbti-container flex h-[65px] items-center justify-between">
      <NuxtLink
        to="/"
        class="flex min-h-12 items-center gap-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84cc16]"
      >
        <span class="text-[24px] leading-[32px] font-bold tracking-[-1.2px] text-[#84cc16]">
          SBTI
        </span>
      </NuxtLink>

      <nav class="sbti-nav-desktop flex items-center gap-8">
        <NuxtLink
          v-for="item in items"
          :key="item.label"
          :to="item.to"
          class="relative inline-flex min-h-12 items-center justify-center rounded-sm px-2 text-[16px] leading-[24px] tracking-[-0.4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84cc16]"
          :class="
            item.active
              ? 'pb-[2px] font-semibold text-[#84cc16]'
              : 'font-normal text-[#94a3b8] hover:text-[#c1cab0]'
          "
        >
          {{ item.label }}
          <span v-if="item.active" class="absolute bottom-0 left-0 h-[2px] w-full bg-[#84cc16]" />
        </NuxtLink>
      </nav>

      <div class="sbti-nav-mobile relative">
        <details class="group">
          <summary
            class="flex min-h-12 list-none items-center justify-center rounded-[10px] border border-[#42493626] bg-[#17181b] px-4 text-[16px] leading-[24px] font-semibold tracking-[-0.4px] text-[#e4e1e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#84cc16]"
          >
            Menu
          </summary>
          <div
            class="absolute top-[56px] right-0 w-[200px] rounded-[12px] border border-[#42493626] bg-[#17181b] p-2 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            <NuxtLink
              v-for="item in items"
              :key="item.label"
              :to="item.to"
              class="flex min-h-12 items-center rounded-[10px] px-3 text-[16px] leading-[24px] tracking-[-0.4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16]"
              :class="
                item.active
                  ? 'bg-[#2a2a2d] font-semibold text-[#84cc16]'
                  : 'font-normal text-[#94a3b8] hover:bg-[#2a2a2d] hover:text-[#c1cab0]'
              "
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </details>
      </div>
    </div>
  </header>
</template>
