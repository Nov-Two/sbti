import type { AppMessages } from './zh-CN'

export const enUS: AppMessages = {
  meta: {
    title: 'SBTI — Discover your kinetic potential',
    description:
      'Next-gen personality assessment: science-flavored storytelling, minutes to finish, shareable results.'
  },
  site: {
    brand: 'SBTI',
    footerTagline: 'Built with precision.',
    copyrightSuffix: 'SBTI.'
  },
  nav: {
    home: 'Home',
    test: 'Test',
    about: 'About',
    menu: 'Menu'
  },
  footer: {
    github: 'GitHub',
    privacy: 'Privacy',
    terms: 'Terms',
    support: 'Support'
  },
  ui: {
    languageMenu: 'Language',
    themeMenu: 'Theme',
    themePanelTitle: 'Appearance & accent',
    appearance: 'Mode',
    modeLight: 'Light',
    modeDark: 'Dark',
    modeSystem: 'System',
    accent: 'Accent',
    accentLime: 'Lime',
    accentViolet: 'Violet',
    accentCyan: 'Cyan',
    accentAmber: 'Amber',
    langZh: '简体中文',
    langEn: 'English',
    quizBank: 'Quiz',
    quizBankSbti: 'SBTI personality',
    quizBankYouth: 'Youth social stress',
    quizBankCustom: 'Custom (uploaded)',
    quizUploadMd: 'Upload .md quiz',
    quizUploadHint: 'Must include: questions, score table, rules',
    quizClearCustom: 'Remove custom',
    quizCreateSample: 'Sample quiz template',
    quizSampleTitle: 'Sample Markdown quiz',
    quizSampleClose: 'Close',
    quizDeleteOne: 'Delete',
    language: 'Language'
  },
  quiz: {
    stepLabel: (current: number, total: number) => `Step ${current} of ${total}`,
    percentComplete: (n: number) => `${Math.round(n)}% complete`,
    previous: 'Previous',
    next: 'Next',
    submit: 'View results',
    waitNeedAnswerTitle: 'Pick an answer',
    waitNeedAnswerDesc: 'Select an option before continuing.',
    waitFinalTitle: 'Pick an answer',
    waitFinalDesc: 'Choose an option for the last question.',
    unfinishedTitle: 'Incomplete questions',
    unfinishedDesc: (n: number) => `Please finish question ${n} first`,
    uploadWrongFileTitle: 'Wrong file type',
    uploadWrongFileDesc: 'Please upload a file with the .md extension.',
    parseFailTitle: 'Could not parse quiz file',
    customLoadedTitle: 'Custom quiz loaded',
    customLoadedDesc: 'Switched to your uploaded questions and scoring rules.',
    customClearedTitle: 'Custom quiz removed',
    customBankLabel: (n: number) => `Custom quiz ${n}`,
    customDeletedTitle: (name: string) => `Removed “${name}”`
  },
  result: {
    title: 'Results are in',
    subtitle: 'You thought you were testing personality — personality was testing you.',
    mainLabel: 'Main tag',
    matchPercent: (n: number) => `${n}% match`,
    endingLabel: 'Closing line',
    topLabel: 'Top tags',
    eggsLabel: 'Hidden easter eggs',
    eggsEmpty: 'None (you have not peaked yet)',
    restart: 'Take again',
    backHome: 'Back home',
    copy: 'Copy result',
    copiedTitle: 'Copied',
    copiedDesc: 'Result copied to clipboard',
    copyFailTitle: 'Copy failed',
    copyFailDesc: 'Clipboard not available or denied'
  },
  home: {
    hero: {
      badge: 'Scientific precision. Human insights.',
      titleBefore: 'Discover your',
      titleAccent: 'Kinetic',
      titleAfter: 'potential.',
      bodyBefore: 'Experience the next generation of personality assessment. SBTI delivers',
      bodyStrong1: 'scientifically validated',
      bodyMid: 'results in under five minutes, with deeply',
      bodyStrong2: 'personalized growth insights',
      bodyAfter: 'for your career and life.',
      startTest: 'Start test',
      exploreMethod: 'Explore methodology'
    },
    features: {
      heading: 'Why the world is switching to SBTI',
      sub: "We've modernized depth psychology for the 21st century without sacrificing the rigor of classic Jungian theory.",
      items: [
        {
          title: 'Scientific validation',
          description:
            'Continuous iteration and data analysis keep our psychometric narrative industry-leading.'
        },
        {
          title: 'Hyper-efficient design',
          description:
            'Advanced branching finds your type in minutes—respecting your time while staying sharp.'
        },
        {
          title: 'Actionable growth',
          description:
            "We don't just give you a label—career, relationships, and self-mastery hints included."
        }
      ]
    },
    details: {
      heading: 'Personalized reports that actually make sense.',
      bullets: [
        {
          title: 'Career alignment',
          description: 'Which environments fuel your kinetic energy and which drain it.'
        },
        {
          title: 'Relationship blueprint',
          description: 'Your communication style and how to bridge gaps with opposing types.'
        },
        {
          title: 'Blindspot analysis',
          description: 'Cognitive biases that hold you back—and strategies to move past them.'
        }
      ],
      cardKicker: 'Growth analytics',
      cardBody: 'Detailed cognitive stack visualization included with every test.'
    },
    cta: {
      heading: 'Ready to meet your true self?',
      button: 'Start your journey'
    }
  },
  about: {
    titleBefore: 'About',
    titleAccent: 'SBTI',
    subtitle: 'More than a test—a cyber-spiritual reckoning.',
    authorHeading: 'Author',
    authorName: 'Nov-Two',
    authorBio:
      'An anonymous builder obsessed with cyber-spiritual vibes—exploring the absurd and the real through code. SBTI is a serious, silly experiment in contemporary social language.',
    techHeading: 'Stack',
    cta: 'Start the test',
    techStack: [
      {
        name: 'Nuxt 4',
        description: 'The Vue framework for shipping with great DX and performance.',
        icon: 'i-simple-icons-nuxtdotjs',
        color: 'text-[#00DC82]'
      },
      {
        name: 'Nuxt UI',
        description: 'Tailwind-based components for consistent, beautiful UI.',
        icon: 'i-simple-icons-tailwindcss',
        color: 'text-[#38bdf8]'
      },
      {
        name: 'Vue 3',
        description: 'Composition API–first framework for modern UIs.',
        icon: 'i-simple-icons-vuedotjs',
        color: 'text-[#42b883]'
      },
      {
        name: 'Motion-v',
        description: 'Smooth motion that elevates interaction.',
        icon: 'i-heroicons-sparkles',
        color: 'text-[color:var(--sbti-accent-bright)]'
      },
      {
        name: 'TypeScript',
        description: 'Types that keep surprises out of production.',
        icon: 'i-simple-icons-typescript',
        color: 'text-[#3178c6]'
      }
    ]
  }
}
