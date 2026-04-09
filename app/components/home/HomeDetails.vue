<script setup lang="ts">
const bullets = [
  {
    title: 'Career Alignment',
    description:
      'Discover which work environments fuel your kinetic energy and which ones drain it.',
    icon: '/images/mnrji1an-wtm9pfp.svg'
  },
  {
    title: 'Relationship Blueprint',
    description: 'Understand your communication style and how to bridge gaps with opposing types.',
    icon: '/images/mnrji1an-wtm9pfp.svg'
  },
  {
    title: 'Blindspot Analysis',
    description:
      'Identify the cognitive biases that hold you back and learn strategies to overcome them.',
    icon: '/images/mnrji1an-wtm9pfp.svg'
  }
]
</script>

<template>
  <UContainer class="py-24 sm:py-32">
    <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
      <div class="space-y-12">
        <h2 class="text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
          Personalized reports that actually make sense.
        </h2>

        <div class="space-y-8">
          <div v-for="bullet in bullets" :key="bullet.title" class="flex gap-4">
            <div class="mt-1 flex-shrink-0">
              <img :src="bullet.icon" :alt="bullet.title" class="text-primary-400 size-6" />
            </div>
            <div>
              <h4 class="mb-1 text-lg font-bold text-white">
                {{ bullet.title }}
              </h4>
              <p class="text-sm leading-relaxed text-slate-400">
                {{ bullet.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative w-full rounded-2xl border border-white/5 bg-[#17181B] p-8 shadow-2xl">
        <div class="mb-8 space-y-4">
          <div class="flex items-center gap-4">
            <div class="h-2 w-full rounded-full bg-[#2A2D31]" />
            <div class="bg-primary-400 size-4 shrink-0 rounded-full" />
          </div>
          <div class="h-2 w-3/4 rounded-full bg-[#2A2D31]" />
          <div class="h-2 w-1/2 rounded-full bg-[#2A2D31]" />
          <div class="mt-6 grid grid-cols-4 gap-4">
            <div class="bg-primary-400 h-12 rounded" />
            <div class="bg-primary-900/50 h-12 rounded" />
            <div class="bg-primary-900/30 h-12 rounded" />
            <div class="bg-primary-800 h-12 rounded" />
          </div>
        </div>

        <div>
          <p class="text-primary-400 mb-2 text-xs font-bold tracking-widest uppercase">
            Growth Analytics
          </p>
          <p class="text-lg leading-snug font-bold text-white">
            Detailed cognitive stack visualization included with every test.
          </p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
