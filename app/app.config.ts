export default defineAppConfig({
  /** 与测验内容无关的站点信息：换品牌 / SEO 主要改这里（标题与描述见 locales） */
  site: {
    name: 'TEST TI',
    ogImage: '/images/mnrji1as-a2h0xjr.png',
    githubUrl: 'https://github.com/Nov-Two/sbti'
  },
  ui: {
    colors: {
      primary: 'lime',
      warning: 'purple',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: 'font-semibold transition-all duration-200'
      },
      variants: {
        size: {
          xs: {
            base: 'px-3'
          },
          sm: {
            base: 'px-4'
          },
          md: {
            base: 'px-4'
          },
          lg: {
            base: 'px-5'
          },
          xl: {
            base: 'px-6'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary' as const,
          variant: 'solid' as const,
          class:
            'hover:bg-primary active:bg-primary shadow-[0_0_20px_var(--btn-glow)] hover:shadow-[0_0_30px_var(--btn-glow-hover)] hover:-translate-y-px active:translate-y-0 [--btn-glow:color-mix(in_oklch,var(--ui-primary)_25%,transparent)] [--btn-glow-hover:color-mix(in_oklch,var(--ui-primary)_35%,transparent)]'
        }
      ]
    }
  }
})
