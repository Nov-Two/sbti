# SBTI · 抽象怪·究极逆天版 - 技术解析

SBTI 是一个基于现代前端技术栈构建的“精神污染”人格测试系统。本项目旨在提供高性能、可维护且富有交互性的用户体验，并深入探讨了 Nuxt 3 (Vue 3) 在复杂应用场景下的实践。

## � 技术栈概览

本项目采用以下核心技术栈：

- **前端框架**: [Nuxt.js 4](https://nuxt.com/) (基于 Vue 3 Composition API)
  - 利用 Nuxt 的约定式路由、自动导入和服务器端渲染 (SSR) / 静态站点生成 (SSG) 能力。
- **UI 组件库**: [@nuxt/ui](https://ui.nuxt.com/)
  - 提供丰富的开箱即用组件，集成 TailwindCSS，加速 UI 开发。
- **样式**: [TailwindCSS](https://tailwindcss.com/)
  - 原子化 CSS 框架，实现快速灵活的 UI 开发和主题定制。
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
  - Vue 官方推荐的状态管理库，轻量且易用，与 Composition API 完美结合。
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
  - 提供类型安全，增强代码健壮性，提高开发效率和可维护性。
- **构建工具**: [Vite](https://vitejs.dev/)
  - 极速的开发服务器和打包工具，提供闪电般的开发体验。
- **实用工具集**: [@vueuse/nuxt](https://vueuse.org/)
  - 提供大量实用的 Composition API，如 `useCookie`、`useLocalStorage` 等，提升开发效率。
- **动画**: [motion-v](https://www.npmjs.com/package/motion-v)
  - 用于实现流畅的页面动画效果，增强用户体验。
- **图标**: [Iconify](https://icon-sets.iconify.design/)
  - 通过 `@iconify-json/lucide` 和 `@iconify-json/simple-icons` 集成，提供丰富的矢量图标。
- **本地数据存储**: `better-sqlite3`
  - 用于本地数据缓存或特定功能的数据存储，可能用于离线模式或桌面应用场景。
- **代码规范**: ESLint, Prettier, Husky, lint-staged
  - 确保代码质量和团队协作效率，自动化代码格式化和 Lint 检查。

## 📂 项目结构

```
.
├── app/                      # Nuxt 应用程序核心
│   ├── app.config.ts         # 应用程序配置，如站点信息、UI 主题
│   ├── app.vue               # Nuxt 根组件，包含全局布局、SEO、主题设置
│   ├── assets/               # 静态资源，如 CSS
│   │   └── css/
│   │       └── main.css      # 全局 CSS 样式
│   ├── components/           # Vue 组件
│   │   ├── home/             # 首页相关组件
│   │   ├── quiz/             # 测验相关组件
│   │   └── shared/           # 共享通用组件
│   ├── composables/          # Vue Composition API 可组合函数
│   │   ├── useAccentTheme.ts # 管理强调色主题
│   │   ├── useAppLocale.ts   # 管理应用语言环境
│   │   ├── useAppStrings.ts  # 根据语言环境提供文本内容
│   │   ├── useCustomQuiz.ts  # 自定义测验的创建、管理与持久化
│   │   ├── useQuiz.ts        # 核心测验逻辑与状态管理
│   │   └── useQuizBank.ts    # 管理当前选中的测验题库
│   ├── data/                 # 测验数据定义
│   │   ├── sbti/             # SBTI 测验数据
│   │   └── youth-stress/     # 青年压力测验数据
│   ├── locales/              # 国际化文本资源
│   │   ├── en-US.ts
│   │   └── zh-CN.ts
│   ├── pages/                # 页面组件 (Nuxt 路由)
│   │   ├── about.vue         # 关于页面
│   │   ├── index.vue         # 首页
│   │   └── test.vue          # 测验页面
│   ├── quiz/                 # 测验运行时模块注册
│   │   ├── active.ts         # 激活的测验模块
│   │   └── registry.ts       # 测验模块注册表
│   ├── types/                # TypeScript 类型定义
│   │   ├── custom-quiz.ts
│   │   ├── quiz-result.ts
│   │   └── quiz.ts
│   └── utils/                # 工具函数
│       ├── formatSbtiResult.ts
│       ├── generateCustomQuizResult.ts
│       ├── hashString.ts
│       ├── parseCustomQuizMd.ts
│       ├── random.ts
│       └── sbti.ts
├── docs/                     # 文档
│   └── 测验可插拔架构.md
├── nuxt.config.ts            # Nuxt 全局配置文件
├── package.json              # 项目依赖与脚本
└── tsconfig.json             # TypeScript 配置
```

## 💡 核心功能模块解析

### 1. 测验系统 (`app/pages/test.vue` & `app/composables/useQuiz.ts`)

- **动态题库加载**: `app/pages/test.vue` 是测验页面的入口。它通过 `useQuizBank` 获取当前选中的 `bankId`，并根据 `bankId` 动态加载测验模块。支持内置测验（如 `sbti` 和 `youth-stress`）以及用户自定义测验。
- **核心测验逻辑**: `app/composables/useQuiz.ts` 封装了单个测验会话的所有核心逻辑和状态管理。
  - 它接收一个 `QuizDefinition`，并将其规范化为 `NormalizedQuestion` 列表。
  - 管理 `currentIndex` (当前问题索引) 和 `answers` (问题 ID 到所选选项的映射)。
  - 提供 `selectAnswer`、`nextQuestion`、`prevQuestion`、`jumpToQuestion` 等方法来控制测验流程。
  - 计算测验进度 (`progress`) 和判断是否为首尾问题 (`isFirstQuestion`, `isLastQuestion`)。
  - 通过 `watch` 监听 `definition.id` 的变化，实现题库切换时的测验重置。
- **UI 组合**: 测验页面通过组合 `QuizBankControls` (题库选择)、`QuizProgress` (进度显示)、`QuizAnswerSheet` (答案概览)、`QuizQuestion` (问题展示)、`QuizOptions` (选项选择) 和 `QuizNavigation` (导航按钮) 等组件，构建了完整的用户交互界面。

### 2. 自定义测验管理 (`app/composables/useCustomQuiz.ts`)

- **持久化存储**: `useCustomQuiz.ts` 是自定义测验功能的核心。它利用 Nuxt 的 `useState` (用于跨组件共享状态) 和 `localStorage` (用于浏览器持久化) 来存储和管理用户创建的自定义测验。
- **版本迁移**: 内置了从旧版本 `STORAGE_V1` 到当前 `STORAGE_V2` 存储格式的迁移逻辑，确保了数据的兼容性。
- **Markdown 解析**: 提供了 `loadFromMarkdown` 方法，能够将用户输入的 Markdown 格式测验文本解析为结构化的 `ParsedCustomQuiz` 对象，并将其保存为新的自定义测验条目。解析逻辑由 `app/utils/parseCustomQuizMd.ts` 提供。
- **运行时模块生成**: `buildRuntime` 函数能够将一个 `CustomQuizEntry` 转换为 `QuizRuntimeModuleLoose`，使其能够被主测验系统识别和运行。
- **唯一 ID**: 为每个自定义测验生成唯一的 `id`，便于管理和引用。

### 3. 国际化与主题 (`app/composables/useAppLocale.ts`, `useAppStrings.ts`, `useAccentTheme.ts`)

- **语言环境管理**: `useAppLocale.ts` 负责管理应用程序的语言环境 (`zh-CN` 或 `en-US`)，并将其持久化到 Cookie 中。
- **文本内容切换**: `useAppStrings.ts` 依赖于 `useAppLocale`，根据当前的语言环境动态提供应用程序的文本内容，实现了多语言支持。文本资源定义在 `app/locales/` 目录下。
- **强调色主题**: `useAccentTheme.ts` 管理应用程序的强调色主题（如 `lime`, `violet` 等），同样通过 Cookie 进行持久化，并与 CSS 变量 `--sbti-accent` 联动，实现动态主题切换。

### 4. 数据层 (`app/data/` & `app/types/`)

- **测验数据定义**: `app/data/` 目录包含了内置测验（如 SBTI 和青年压力测验）的定义文件，包括 `definition.ts` (测验结构)、`narrative.ts` (结果描述) 和 `questions.ts` (问题列表)。
- **类型安全**: `app/types/` 目录定义了项目中使用的所有 TypeScript 类型接口，如 `QuizDefinition`, `QuizResultPayload`, `CustomQuizEntry` 等，确保了代码的类型安全和可读性。

## 🛠️ 开发指南

### 1. 克隆项目

```bash
git clone [项目仓库地址]
cd sbti
```

### 2. 安装依赖

本项目使用 `pnpm` 作为包管理器。

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

### 4. 浏览器访问

项目将在开发模式下运行，通常可以通过 `http://localhost:3000` 访问。

### 5. 构建生产版本

```bash
pnpm build
```

### 6. 预览生产版本

```bash
pnpm preview
```

---

_本技术文档旨在深入解析 SBTI 项目的实现细节，供开发者参考。_
