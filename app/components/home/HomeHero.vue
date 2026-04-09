<script setup lang="ts">
import { motion } from 'motion-v'

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
}
</script>

<template>
  <section class="relative py-32">
    <div class="sbti-hero-container">
      <div class="sbti-hero-layout">
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
              to="/test"
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
          <div class="bg-primary-400/20 absolute -inset-4 -z-10 blur-[100px]" />
        </motion.div>
      </div>
    </div>
  </section>
</template>
