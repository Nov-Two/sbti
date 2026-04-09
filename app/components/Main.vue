<script setup lang="ts">
import { motion } from 'motion-v'

const features = [
  {
    title: 'Scientific Validation',
    description: 'Our assessment undergoes continuous peer-review and data analysis to ensure its psychometric reliability remains industry-leading.',
    icon: '/images/mnrji1am-2zhfhzt.svg'
  },
  {
    title: 'Hyper-Efficient Design',
    description: 'Through advanced algorithmic branching, we pinpoint your type in under 5 minutes—respecting your time while maintaining accuracy.',
    icon: '/images/mnrji1an-qguh91c.svg'
  },
  {
    title: 'Actionable Growth',
    description: 'We don\'t just give you a label. We provide specific, personalized blueprints for career growth, relationship dynamics, and self-mastery.',
    icon: '/images/mnrji1an-4dkzqyd.svg'
  }
]

const bullets = [
  {
    title: 'Career Alignment',
    description: 'Discover which work environments fuel your kinetic energy and which ones drain it.',
    icon: '/images/mnrji1an-wtm9pfp.svg'
  },
  {
    title: 'Relationship Blueprint',
    description: 'Understand your communication style and how to bridge gaps with opposing types.',
    icon: '/images/mnrji1an-wtm9pfp.svg'
  },
  {
    title: 'Blindspot Analysis',
    description: 'Identify the cognitive biases that hold you back and learn strategies to overcome them.',
    icon: '/images/mnrji1an-wtm9pfp.svg'
  }
]

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
}
</script>

<template>
  <div class="relative w-full overflow-hidden bg-[#101114]">
    <!-- Hero Section -->
    <UContainer class="relative py-24 sm:py-32 lg:py-40">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
        <!-- Left content -->
        <motion.div 
          initial="hidden" 
          animate="visible" 
          :variants="stagger"
          class="flex flex-col items-start space-y-6"
        >
          <div class="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-primary-400">
            Scientific Precision. Human Insights.
          </div>
          
          <h1 class="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Discover your<br>
            <span class="italic text-primary-400">Kinetic</span><br>
            potential.
          </h1>
          
          <p class="max-w-xl text-lg leading-relaxed text-slate-400">
            Experience the next generation of personality assessment. SBTI provides 
            <strong class="text-white font-medium">scientifically validated</strong> results in 
            <strong class="text-white font-medium">under 5 minutes</strong>, delivering deeply 
            <strong class="text-white font-medium">personalized growth insights</strong> for your career and life.
          </p>
          
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <UButton 
              size="xl" 
              color="primary" 
              class="rounded-full font-bold px-8 shadow-[0_0_20px_rgba(159,232,112,0.3)] hover:shadow-[0_0_30px_rgba(159,232,112,0.5)]"
            >
              Start Test
              <template #trailing>
                <img src="/images/mnrji1am-owm8pu4.svg" class="size-4" alt="Arrow" />
              </template>
            </UButton>
            <UButton 
              size="xl" 
              color="neutral" 
              variant="solid"
              class="rounded-full bg-[#2A2D31] px-8 text-white hover:bg-[#34383D]"
            >
              Explore Methodology
            </UButton>
          </div>
        </motion.div>

        <!-- Right image card -->
        <motion.div 
          :initial="{ opacity: 0, scale: 0.95 }" 
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.8, delay: 0.2 }"
          class="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-[#17181B] shadow-2xl">
            <img 
              src="/images/mnrji1as-a2h0xjr.png" 
              alt="16 Personalities" 
              class="w-full object-cover opacity-80"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8">
              <p class="text-xs font-bold uppercase tracking-widest text-primary-400 mb-1">Verified Accuracy</p>
              <p class="text-xl font-bold text-white">16 Personalities, 1 Clear Vision.</p>
            </div>
          </div>
          <!-- Decorative glow -->
          <div class="absolute -inset-4 -z-10 bg-primary-400/20 blur-[100px]"></div>
        </motion.div>
      </div>
    </UContainer>

    <!-- Features Section -->
    <UContainer class="py-24 sm:py-32">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Why the world is switching to SBTI
        </h2>
        <p class="mt-4 text-lg text-slate-400">
          We've modernized depth psychology to fit the pace of the 21st century without<br class="hidden sm:block">
          sacrificing the rigor of classic Jungian theory.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <UCard 
          v-for="feature in features" 
          :key="feature.title"
          :ui="{ root: 'bg-[#17181B] ring-1 ring-white/5 rounded-2xl' }"
          class="transition-all duration-300 hover:ring-primary-400/50 hover:shadow-[0_0_30px_rgba(159,232,112,0.1)]"
        >
          <div class="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/5">
            <img :src="feature.icon" :alt="feature.title" class="size-6" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
          <p class="text-sm leading-relaxed text-slate-400">{{ feature.description }}</p>
        </UCard>
      </div>
    </UContainer>

    <!-- Detailed Section -->
    <UContainer class="py-24 sm:py-32">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <!-- Left Bullets -->
        <div class="space-y-12">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
            Personalized reports that actually make sense.
          </h2>
          
          <div class="space-y-8">
            <div v-for="bullet in bullets" :key="bullet.title" class="flex gap-4">
              <div class="mt-1 flex-shrink-0">
                <img :src="bullet.icon" :alt="bullet.title" class="size-6 text-primary-400" />
              </div>
              <div>
                <h4 class="text-lg font-bold text-white mb-1">{{ bullet.title }}</h4>
                <p class="text-sm text-slate-400 leading-relaxed">{{ bullet.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Card -->
        <div class="relative w-full rounded-2xl border border-white/5 bg-[#17181B] p-8 shadow-2xl">
          <!-- Abstract representation of the UI from screenshot -->
          <div class="mb-8 space-y-4">
            <div class="flex items-center gap-4">
              <div class="h-2 w-full rounded-full bg-[#2A2D31]"></div>
              <div class="size-4 rounded-full bg-primary-400 shrink-0"></div>
            </div>
            <div class="h-2 w-3/4 rounded-full bg-[#2A2D31]"></div>
            <div class="h-2 w-1/2 rounded-full bg-[#2A2D31]"></div>
            <div class="grid grid-cols-4 gap-4 mt-6">
              <div class="h-12 rounded bg-primary-400"></div>
              <div class="h-12 rounded bg-primary-900/50"></div>
              <div class="h-12 rounded bg-primary-900/30"></div>
              <div class="h-12 rounded bg-primary-800"></div>
            </div>
          </div>

          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-primary-400 mb-2">Growth Analytics</p>
            <p class="text-lg font-bold text-white leading-snug">
              Detailed cognitive stack visualization included with every test.
            </p>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <UContainer class="py-24 sm:py-32">
      <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#17181B] to-[#101114] px-6 py-20 text-center shadow-2xl sm:px-16">
        <h2 class="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-10">
          Ready to meet your true self?
        </h2>
        <UButton 
          size="xl" 
          color="primary" 
          class="rounded-full font-bold px-10 shadow-[0_0_30px_rgba(159,232,112,0.3)] hover:shadow-[0_0_40px_rgba(159,232,112,0.6)]"
        >
          Start Your Journey
        </UButton>
        <!-- Background glows -->
        <div class="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-400/20 blur-[100px]"></div>
      </div>
    </UContainer>
  </div>
</template>
