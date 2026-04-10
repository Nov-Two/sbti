<script setup lang="ts">
import { motion } from 'motion-v'
import { useAppStrings } from '~/composables/useAppStrings'

const strings = useAppStrings()

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
            class="inline-flex items-start rounded-full border px-[11px] py-[3px]"
            :class="'border-[color:var(--sbti-accent-bright)]/20 bg-[color:var(--sbti-accent-bright)]/10'"
          >
            <span
              class="font-mono text-[12px] leading-[16px] tracking-[0.2em] text-[color:var(--sbti-accent-bright)] uppercase"
            >
              {{ strings.home.hero.badge }}
            </span>
          </div>

          <h1
            class="text-[48px] leading-[52px] font-bold tracking-[-4.8px] sm:text-[64px] sm:leading-[68px] lg:text-[96px] lg:leading-[96px]"
            :class="'text-[color:var(--sbti-text)]'"
          >
            <span>{{ strings.home.hero.titleBefore }}</span
            ><br />
            <span class="text-[color:var(--sbti-accent-bright)] italic">{{
              strings.home.hero.titleAccent
            }}</span
            ><br />
            <span>{{ strings.home.hero.titleAfter }}</span>
          </h1>

          <div class="sbti-hero-desc flex w-full flex-col items-start pt-3">
            <p class="w-full text-[20px] leading-[33px] text-[color:var(--sbti-text-muted)]">
              {{ strings.home.hero.bodyBefore }}
              <strong class="font-semibold text-[color:var(--sbti-text)]">{{
                strings.home.hero.bodyStrong1
              }}</strong>
              {{ strings.home.hero.bodyMid }}
              <strong class="font-semibold text-[color:var(--sbti-text)]">{{
                strings.home.hero.bodyStrong2
              }}</strong>
              {{ strings.home.hero.bodyAfter }}
            </p>
          </div>

          <div class="flex w-full flex-col items-stretch gap-6 pt-7">
            <UButton
              size="xl"
              color="primary"
              variant="solid"
              to="/test"
              class="sbti-hero-btn relative h-[68px] w-full justify-center rounded-[12px] px-5 text-[18px] font-bold shadow-[0px_25px_50px_-12px_color-mix(in_oklch,var(--sbti-accent-bright)_25%,transparent)] transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--sbti-ring)] active:translate-y-0"
              :class="'bg-[linear-gradient(174.43deg,var(--sbti-accent-bright)_-0.57%,var(--sbti-accent)_100.57%)] text-[color:var(--sbti-on-accent)]'"
            >
              <span>{{ strings.home.hero.startTest }}</span>
              <img src="/images/mnrji1am-owm8pu4.svg" alt="" class="absolute right-5 size-4" />
            </UButton>
            <UButton
              size="xl"
              color="neutral"
              variant="solid"
              class="sbti-hero-btn h-[68px] w-full justify-center rounded-[12px] border px-5 text-[18px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--sbti-ring)] active:bg-[color:var(--sbti-elevated)]"
              :class="'border-[color:var(--sbti-border-subtle)] bg-[color:var(--sbti-border-subtle)] text-[color:var(--sbti-accent-bright)] hover:bg-[color:var(--sbti-border-subtle)]/90'"
            >
              {{ strings.home.hero.exploreMethod }}
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
            class="relative overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--sbti-elevated)] shadow-2xl"
          >
            <img
              src="/images/mnrji1as-a2h0xjr.png"
              alt="16 Personalities"
              class="w-full object-cover opacity-80"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[color:var(--sbti-page-bg)] via-transparent to-transparent"
            />
            <div class="absolute bottom-0 left-0 p-8">
              <p
                class="mb-1 text-xs font-bold tracking-widest text-[color:var(--sbti-accent)] uppercase"
              >
                Verified Accuracy
              </p>
              <p class="text-xl font-bold text-[color:var(--sbti-text)]">
                16 Personalities, 1 Clear Vision.
              </p>
            </div>
          </div>
          <div
            class="absolute -inset-4 -z-10 blur-[100px]"
            :class="'bg-[color:var(--sbti-accent)]/20'"
          />
        </motion.div>
      </div>
    </div>
  </section>
</template>
