<script setup lang="ts">
const techStack = [
  {
    name: 'Nuxt 4',
    description: '强大的 Vue 框架，提供极佳的开发体验和性能优化。',
    icon: 'i-simple-icons-nuxtdotjs',
    color: 'text-[#00DC82]'
  },
  {
    name: 'Nuxt UI',
    description: '基于 Tailwind CSS 的 UI 组件库，确保了项目的一致性和美观。',
    icon: 'i-simple-icons-tailwindcss',
    color: 'text-[#38bdf8]'
  },
  {
    name: 'Vue 3',
    description: '组合式 API 驱动的现代前端框架。',
    icon: 'i-simple-icons-vuedotjs',
    color: 'text-[#42b883]'
  },
  {
    name: 'Motion-v',
    description: '流畅的动画效果实现，提升了用户交互体验。',
    icon: 'i-heroicons-sparkles',
    color: 'text-[#9ee939]'
  },
  {
    name: 'TypeScript',
    description: '强类型检查，保证了代码的健壮性和可维护性。',
    icon: 'i-simple-icons-typescript',
    color: 'text-[#3178c6]'
  }
]

const author = {
  name: 'Nov-Two',
  description:
    '一位深耕于赛博精神领域的匿名开发者。致力于通过代码探索人类灵魂中那些“抽象”而又“真实”的一面。SBTI 是其对当代社交语境的一次荒诞而严肃的尝试。',
  avatar: 'i-heroicons-user-circle'
}
</script>

<template>
  <div class="min-h-[calc(100vh-65px-121px)] bg-[#101114] px-4 py-20">
    <UContainer class="max-w-4xl">
      <!-- Page Header -->
      <div class="mb-16 text-center">
        <h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          关于 <span class="text-[#84cc16]">SBTI</span>
        </h1>
        <p class="text-lg text-slate-400">不仅仅是一个测试，更是一场赛博精神的自我救赎。</p>
      </div>

      <!-- Author Section -->
      <section class="mb-24">
        <h2 class="mb-8 border-l-4 border-[#84cc16] pl-4 text-2xl font-bold text-white">
          作者介绍
        </h2>
        <UCard :ui="{ root: 'bg-[#17181B] border-white/5 shadow-2xl overflow-hidden' }">
          <div class="flex flex-col items-center gap-8 p-6 md:flex-row">
            <div
              class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#84cc161a]"
            >
              <UIcon :name="author.avatar" class="h-16 w-16 text-[#84cc16]" />
            </div>
            <div>
              <h3 class="mb-2 text-2xl font-bold text-white">{{ author.name }}</h3>
              <p class="leading-relaxed text-slate-400">
                {{ author.description }}
              </p>
            </div>
          </div>
        </UCard>
      </section>

      <!-- Tech Stack Section -->
      <section>
        <h2 class="mb-8 border-l-4 border-[#84cc16] pl-4 text-2xl font-bold text-white">
          技术架构
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <UCard
            v-for="tech in techStack"
            :key="tech.name"
            :ui="{
              root: 'bg-[#17181B] border-white/5 hover:border-[#84cc1633] transition-colors shadow-lg'
            }"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5"
              >
                <UIcon :name="tech.icon" class="h-6 w-6" :class="tech.color" />
              </div>
              <div>
                <h4 class="mb-1 text-lg font-bold text-white">{{ tech.name }}</h4>
                <p class="text-sm leading-snug text-slate-400">
                  {{ tech.description }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <!-- CTA -->
      <div class="mt-24 text-center">
        <UButton
          size="xl"
          color="primary"
          to="/test"
          class="rounded-full px-20 font-bold shadow-[0_0_30px_rgba(132,204,22,0.3)]"
        >
          立即开始测试
        </UButton>
      </div>
    </UContainer>
  </div>
</template>
