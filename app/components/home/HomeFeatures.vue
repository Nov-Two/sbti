<script setup lang="ts">
const features = [
  {
    title: 'Scientific Validation',
    description:
      'Our assessment undergoes continuous peer-review and data analysis to ensure its psychometric reliability remains industry-leading.',
    icon: '/images/mnrji1am-2zhfhzt.svg'
  },
  {
    title: 'Hyper-Efficient Design',
    description:
      'Through advanced algorithmic branching, we pinpoint your type in under 5 minutes—respecting your time while maintaining accuracy.',
    icon: '/images/mnrji1an-qguh91c.svg'
  },
  {
    title: 'Actionable Growth',
    description:
      "We don't just give you a label. We provide specific, personalized blueprints for career growth, relationship dynamics, and self-mastery.",
    icon: '/images/mnrji1an-4dkzqyd.svg'
  }
]
</script>

<template>
  <UContainer class="py-24 sm:py-32">
    <div class="mb-16 text-center">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        Why the world is switching to SBTI
      </h2>
      <p class="mt-4 text-lg text-slate-400">
        We've modernized depth psychology to fit the pace of the 21st century without<br
          class="hidden sm:block"
        />
        sacrificing the rigor of classic Jungian theory.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <UCard
        v-for="feature in features"
        :key="feature.title"
        :ui="{ root: 'bg-[#17181B] ring-1 ring-white/5 rounded-2xl' }"
        class="hover:ring-primary-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(159,232,112,0.1)]"
      >
        <div class="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/5">
          <img :src="feature.icon" :alt="feature.title" class="size-6" />
        </div>
        <h3 class="mb-3 text-xl font-bold text-white">
          {{ feature.title }}
        </h3>
        <p class="text-sm leading-relaxed text-slate-400">
          {{ feature.description }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
