<script setup lang="ts">
import { motion } from 'motion-v'

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

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
}
</script>

<template>
  <div class="relative w-full overflow-hidden bg-[#101114]">
    <!-- Hero Section -->
    <section class="relative py-32">
      <div class="sbti-hero-container">
        <div class="sbti-hero-layout">
          <!-- Left content -->
          <motion.div
            initial="hidden"
            animate="visible"
            :variants="stagger"
            class="sbti-hero-left flex w-full flex-col items-start gap-5"
          >
            <div
              class="inline-flex items-start rounded-full border border-[#9ee93933] bg-[#9ee9391a] px-[11px] py-[3px]"
            >
              <span
                class="font-mono text-[12px] leading-[16px] tracking-[0.2em] text-[#9ee939] uppercase"
              >
                Scientific Precision. Human Insights.
              </span>
            </div>

            <h1
              class="text-[48px] leading-[52px] font-bold tracking-[-4.8px] text-[#e4e1e6] sm:text-[64px] sm:leading-[68px] lg:text-[96px] lg:leading-[96px]"
            >
              <span>Discover your</span><br />
              <span class="text-[#9ee939] italic">Kinetic</span><br />
              <span>potential.</span>
            </h1>

            <div class="sbti-hero-desc flex w-full flex-col items-start pt-3">
              <p class="w-full text-[20px] leading-[33px] text-[#c1cab0]">
                Experience the next generation of personality assessment. SBTI provides
                <strong class="font-semibold text-[#e4e1e6]">scientifically validated</strong>
                results in <strong class="font-semibold text-[#e4e1e6]">under 5 minutes</strong>,
                delivering deeply
                <strong class="font-semibold text-[#e4e1e6]">personalized growth insights</strong>
                for your career and life.
              </p>
            </div>

            <div class="flex w-full flex-col items-stretch gap-6 pt-7">
              <UButton
                size="xl"
                color="primary"
                variant="solid"
                class="sbti-hero-btn relative h-[68px] w-full justify-center rounded-[12px] bg-[linear-gradient(174.43deg,#9ee939_-0.57%,#84cc16_100.57%)] px-5 text-[18px] font-bold text-[#1f3700] shadow-[0px_25px_50px_-12px_rgba(158,233,57,0.2)] transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ee939] active:translate-y-0"
              >
                <span>Start Test</span>
                <img src="/images/mnrji1am-owm8pu4.svg" alt="" class="absolute right-5 size-4" />
              </UButton>
              <UButton
                size="xl"
                color="neutral"
                variant="solid"
                class="sbti-hero-btn h-[68px] w-full justify-center rounded-[12px] border border-[#42493626] bg-[#2a2a2d] px-5 text-[18px] font-bold text-[#9ee939] transition-colors hover:bg-[#303034] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ee939] active:bg-[#262629]"
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
            <div
              class="relative overflow-hidden rounded-2xl border border-white/10 bg-[#17181B] shadow-2xl"
            >
              <img
                src="/images/mnrji1as-a2h0xjr.png"
                alt="16 Personalities"
                class="w-full object-cover opacity-80"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent"
              />
              <div class="absolute bottom-0 left-0 p-8">
                <p class="text-primary-400 mb-1 text-xs font-bold tracking-widest uppercase">
                  Verified Accuracy
                </p>
                <p class="text-xl font-bold text-white">16 Personalities, 1 Clear Vision.</p>
              </div>
            </div>
            <!-- Decorative glow -->
            <div class="bg-primary-400/20 absolute -inset-4 -z-10 blur-[100px]" />
          </motion.div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
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

    <!-- Detailed Section -->
    <UContainer class="py-24 sm:py-32">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <!-- Left Bullets -->
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

        <!-- Right Card -->
        <div class="relative w-full rounded-2xl border border-white/5 bg-[#17181B] p-8 shadow-2xl">
          <!-- Abstract representation of the UI from screenshot -->
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

    <!-- CTA Section -->
    <UContainer class="py-24 sm:py-32">
      <div
        class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#17181B] to-[#101114] px-6 py-20 text-center shadow-2xl sm:px-16"
      >
        <h2
          class="mx-auto mb-10 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Ready to meet your true self?
        </h2>
        <UButton
          size="xl"
          color="primary"
          class="rounded-full px-10 font-bold shadow-[0_0_30px_rgba(159,232,112,0.3)] hover:shadow-[0_0_40px_rgba(159,232,112,0.6)]"
        >
          Start Your Journey
        </UButton>
        <!-- Background glows -->
        <div
          class="bg-primary-400/20 absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full blur-[100px]"
        />
      </div>
    </UContainer>
  </div>
</template>
