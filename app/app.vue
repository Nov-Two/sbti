<script setup lang="ts">
const colorMode = useColorMode()
const app = useAppConfig()
const { locale } = useAppLocale()
const { accent } = useAccentTheme()
const strings = useAppStrings()

const themeColorMeta = computed(() =>
  colorMode.value === 'dark' ? 'var(--sbti-page-bg, #101114)' : '#f8fafc'
)

useHead(() => ({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: themeColorMeta.value }
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: locale.value === 'en-US' ? 'en' : 'zh-CN',
    'data-accent': accent.value
  }
}))

useSeoMeta({
  title: () => strings.value.meta.title,
  description: () => strings.value.meta.description,
  ogImage: app.site.ogImage,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <TopNavBar />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
