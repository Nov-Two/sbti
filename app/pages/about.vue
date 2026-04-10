<script setup lang="ts">
import { useAppStrings } from '~/composables/useAppStrings'

const strings = useAppStrings()

const techStack = computed(() => strings.value.about.techStack)

const author = computed(() => ({
  name: strings.value.about.authorName,
  description: strings.value.about.authorBio,
  avatar: 'i-heroicons-user-circle'
}))
</script>

<template>
  <div class="min-h-[calc(100vh-65px-121px)] bg-[color:var(--sbti-page-bg)] px-4 py-20">
    <UContainer class="max-w-4xl">
      <div class="mb-16 text-center">
        <h1
          class="mb-4 text-4xl font-bold tracking-tight text-[color:var(--sbti-text)] sm:text-6xl"
        >
          {{ strings.about.titleBefore }}
          <span class="text-[color:var(--sbti-accent)]">{{ strings.about.titleAccent }}</span>
        </h1>
        <p class="text-lg text-[color:var(--sbti-text-muted)]">{{ strings.about.subtitle }}</p>
      </div>

      <section class="mb-24">
        <h2
          class="mb-8 border-l-4 border-[color:var(--sbti-accent)] pl-4 text-2xl font-bold text-[color:var(--sbti-text)]"
        >
          {{ strings.about.authorHeading }}
        </h2>
        <UCard
          :ui="{
            root: 'bg-[color:var(--sbti-elevated)] border-white/5 shadow-2xl overflow-hidden dark:border-white/5'
          }"
        >
          <div class="flex flex-col items-center gap-8 p-6 md:flex-row">
            <div
              class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[color:var(--sbti-accent)]/15"
            >
              <UIcon :name="author.avatar" class="h-16 w-16 text-[color:var(--sbti-accent)]" />
            </div>
            <div>
              <h3 class="mb-2 text-2xl font-bold text-[color:var(--sbti-text)]">
                {{ author.name }}
              </h3>
              <p class="leading-relaxed text-[color:var(--sbti-text-muted)]">
                {{ author.description }}
              </p>
            </div>
          </div>
        </UCard>
      </section>

      <section>
        <h2
          class="mb-8 border-l-4 border-[color:var(--sbti-accent)] pl-4 text-2xl font-bold text-[color:var(--sbti-text)]"
        >
          {{ strings.about.techHeading }}
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <UCard
            v-for="tech in techStack"
            :key="tech.name"
            :ui="{
              root: 'bg-[color:var(--sbti-elevated)] border-white/5 hover:border-[color:var(--sbti-accent)]/25 transition-colors shadow-lg dark:border-white/5'
            }"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5"
              >
                <UIcon :name="tech.icon" class="h-6 w-6" :class="tech.color" />
              </div>
              <div>
                <h4 class="mb-1 text-lg font-bold text-[color:var(--sbti-text)]">
                  {{ tech.name }}
                </h4>
                <p class="text-sm leading-snug text-[color:var(--sbti-text-muted)]">
                  {{ tech.description }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <div class="mt-24 text-center">
        <UButton
          size="xl"
          color="primary"
          to="/test"
          class="rounded-full px-20 font-bold shadow-[0_0_30px_color-mix(in_oklch,var(--sbti-accent)_30%,transparent)]"
        >
          {{ strings.about.cta }}
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
