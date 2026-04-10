/** 界面文案 */
export const zhCN = {
  meta: {
    title: 'SBTI — 发现你的动能潜能',
    description: '新一代人格测评：科学感叙事、数分钟完成、结果可分享。'
  },
  site: {
    brand: 'SBTI',
    footerTagline: '精准构建。',
    copyrightSuffix: 'SBTI.'
  },
  nav: {
    home: '首页',
    test: '测验',
    about: '关于',
    menu: '菜单'
  },
  footer: {
    github: 'GitHub',
    privacy: '隐私',
    terms: '条款',
    support: '支持'
  },
  ui: {
    languageMenu: '语言',
    themeMenu: '外观',
    themePanelTitle: '主题与强调色',
    appearance: '明暗',
    modeLight: '浅色',
    modeDark: '深色',
    modeSystem: '跟随系统',
    accent: '强调色',
    accentLime: '青柠',
    accentViolet: '紫罗兰',
    accentCyan: '青色',
    accentAmber: '琥珀',
    langZh: '简体中文',
    langEn: 'English',
    quizBank: '题库',
    quizBankSbti: 'SBTI 人格测试',
    quizBankYouth: '年轻人社会压力',
    quizBankCustom: '自定义题库',
    quizUploadMd: '上传 .md 题库',
    quizUploadHint: '需含：题目、得分映射表、计算规则',
    quizClearCustom: '清除自定义',
    quizCreateSample: '创建题库示例',
    quizSampleTitle: '题库 Markdown 示例',
    quizSampleClose: '关闭',
    quizDeleteOne: '删除',
    language: '语言'
  },
  quiz: {
    stepLabel: (current: number, total: number) => `第 ${current} / ${total} 步`,
    percentComplete: (n: number) => `${Math.round(n)}% 完成`,
    previous: '上一题',
    next: '下一题',
    submit: '查看结果',
    waitNeedAnswerTitle: '请先作答',
    waitNeedAnswerDesc: '请选择一项后再进入下一题。',
    waitFinalTitle: '请先作答',
    waitFinalDesc: '请为最后一题选择一项。',
    unfinishedTitle: '还有未完成的题目',
    unfinishedDesc: (n: number) => `请先完成第 ${n} 题`,
    uploadWrongFileTitle: '文件类型不对',
    uploadWrongFileDesc: '请上传扩展名为 .md 的 Markdown 文件。',
    parseFailTitle: '无法解析题库',
    customLoadedTitle: '已加载自定义题库',
    customLoadedDesc: '已切换为你上传的题目与计分规则。',
    customClearedTitle: '已清除自定义题库',
    customBankLabel: (n: number) => `自定义题库${n}`,
    customDeletedTitle: (name: string) => `已删除「${name}」`
  },
  result: {
    title: '鉴定完成',
    subtitle: '你以为你是来测人格的，实际上你是在被人格测。',
    mainLabel: '主标签',
    matchPercent: (n: number) => `匹配度 ${n}%`,
    endingLabel: '结尾语',
    topLabel: 'TOP 标签排行',
    eggsLabel: '隐藏彩蛋',
    eggsEmpty: '无（说明你还没到极致）',
    restart: '重新测一次',
    backHome: '返回首页',
    copy: '复制结果',
    copiedTitle: '已复制',
    copiedDesc: '结果已复制到剪贴板',
    copyFailTitle: '复制失败',
    copyFailDesc: '浏览器不支持剪贴板或未授权'
  },
  home: {
    hero: {
      badge: '科学严谨 · 人性洞察',
      titleBefore: '发现你的',
      titleAccent: '动能',
      titleAfter: '潜能。',
      bodyBefore: '体验新一代人格评估。SBTI 在',
      bodyStrong1: '五分钟以内',
      bodyMid: '给出经',
      bodyStrong2: '科学叙事包装',
      bodyAfter: '的结果，为你的职业与生活提供深度个性化成长参考。',
      startTest: '开始测验',
      exploreMethod: '了解方法'
    },
    features: {
      heading: '为什么大家转向 SBTI',
      sub: '我们把深度心理学做成 21 世纪节奏，但不牺牲荣格传统的严谨。',
      items: [
        {
          title: '科学叙事',
          description: '测评持续迭代与数据分析，让心理测量叙事保持行业领先的「像那么回事」。'
        },
        {
          title: '极速完成',
          description: '算法分支让你在几分钟内拿到标签，省时间，也省情绪。'
        },
        {
          title: '可行动反馈',
          description: '不止一个标签，还有职业、关系与自我吐槽方向的提示。'
        }
      ]
    },
    details: {
      heading: '真正能看懂的个性化报告。',
      bullets: [
        {
          title: '职业对齐',
          description: '哪些环境放大你的动能，哪些在掏空你。'
        },
        {
          title: '关系蓝图',
          description: '沟通风格与和相反类型的相处建议。'
        },
        {
          title: '盲点吐槽',
          description: '指出拖你后腿的认知偏差，并给应对策略。'
        }
      ],
      cardKicker: '成长分析',
      cardBody: '每次测验附带认知栈可视化（概念示意）。'
    },
    cta: {
      heading: '准备好认识「真实」的自己了吗？',
      button: '开始旅程'
    }
  },
  about: {
    titleBefore: '关于',
    titleAccent: 'SBTI',
    subtitle: '不只是测试，更是一场赛博语境里的自我救赎。',
    authorHeading: '作者',
    authorName: 'Nov-Two',
    authorBio:
      '一位深耕赛博精神领域的匿名开发者，用代码探索当代社交语境里荒诞又真实的灵魂切片。SBTI 是一次严肃又胡闹的实验。',
    techHeading: '技术栈',
    cta: '立即开始测验',
    techStack: [
      {
        name: 'Nuxt 4',
        description: 'Vue 全栈框架，开发体验与性能兼顾。',
        icon: 'i-simple-icons-nuxtdotjs',
        color: 'text-[#00DC82]'
      },
      {
        name: 'Nuxt UI',
        description: '基于 Tailwind 的组件库，保证界面一致性与美观。',
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
        description: '流畅动效，提升交互质感。',
        icon: 'i-heroicons-sparkles',
        color: 'text-[color:var(--sbti-accent-bright)]'
      },
      {
        name: 'TypeScript',
        description: '静态类型，减少线上惊喜。',
        icon: 'i-simple-icons-typescript',
        color: 'text-[#3178c6]'
      }
    ]
  }
}

export type AppMessages = typeof zhCN
