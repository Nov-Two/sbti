/**
 * @fileoverview 自定义题库业务：多份上传、展示名（自定义题库1/2…）、与 `useState` 同步全站、localStorage 落盘。
 * 测验页与 `QuizBankControls` 共用同一状态，避免多处 `useLocalStorage` 引用不一致导致题目不刷新。
 */
import type { ParsedCustomQuiz } from '~/types/custom-quiz'
import type {
  AnswerMap,
  GenerateResultOptions,
  QuizBankId,
  QuizRuntimeModuleLoose
} from '~/types/quiz'
import type { QuizResultPayload } from '~/types/quiz-result'
import { generateCustomQuizResult } from '~/utils/generateCustomQuizResult'
import { parseCustomQuizMd } from '~/utils/parseCustomQuizMd'

/** 与旧版 localStorage 键一致，便于迁移与手动清理 */
const STORAGE_V1 = 'sbti-custom-quiz-v1'
const STORAGE_V2 = 'sbti-custom-quizzes-v2'

/** Nuxt 跨组件共享，避免多处调用 composable 时各自持有一份 useLocalStorage 引用导致不同步 */
const STATE_KEY = 'sbti-custom-quizzes-shared'

export interface CustomQuizEntry {
  id: string
  label: string
  parsed: ParsedCustomQuiz
  raw: string
  createdAt: number
}

interface StoredV2 {
  version: 2
  entries: CustomQuizEntry[]
  nextLabelIndex: number
}

interface StoredV1 {
  parsed: ParsedCustomQuiz
  raw: string
}

function normalizeStoredV2(s: StoredV2 | null | undefined): StoredV2 {
  if (!s || typeof s !== 'object') {
    return { version: 2, entries: [], nextLabelIndex: 1 }
  }
  const list = Array.isArray(s.entries) ? s.entries : []
  const next =
    typeof s.nextLabelIndex === 'number' &&
    Number.isFinite(s.nextLabelIndex) &&
    s.nextLabelIndex >= 1
      ? s.nextLabelIndex
      : Math.max(1, list.length + 1)
  return { version: 2, entries: list, nextLabelIndex: next }
}

function newEntryId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function buildRuntime(entry: CustomQuizEntry): QuizRuntimeModuleLoose<QuizResultPayload> {
  const p = entry.parsed
  const defId = `custom-entry-${entry.id}`
  const definition = { ...p.definition, id: defId }
  return {
    id: defId,
    definition,
    computeResult: (answers: AnswerMap<string>, opt?: GenerateResultOptions) =>
      generateCustomQuizResult(p, answers, opt)
  }
}

function readV2FromLocalStorage(): StoredV2 | null {
  if (!import.meta.client) return null
  try {
    const raw = localStorage.getItem(STORAGE_V2)
    if (!raw) return null
    return normalizeStoredV2(JSON.parse(raw) as StoredV2 | null)
  } catch {
    return null
  }
}

export function useCustomQuiz() {
  const stored = useState<StoredV2 | null>(STATE_KEY, () => null)

  if (import.meta.client && stored.value === null) {
    const fromLs = readV2FromLocalStorage()
    if (fromLs) {
      stored.value = fromLs
    }
  }

  if (import.meta.client) {
    watch(
      stored,
      v => {
        try {
          if (v == null) localStorage.removeItem(STORAGE_V2)
          else localStorage.setItem(STORAGE_V2, JSON.stringify(v))
        } catch {
          /* ignore */
        }
      },
      { deep: true }
    )
  }

  const entries = computed(() => normalizeStoredV2(stored.value).entries)

  const migrateV1IfNeeded = () => {
    if (!import.meta.client || stored.value) return
    try {
      const raw = localStorage.getItem(STORAGE_V1)
      if (!raw) return
      const v1 = JSON.parse(raw) as StoredV1
      if (!v1?.parsed) return
      stored.value = {
        version: 2,
        entries: [
          {
            id: newEntryId(),
            label: '自定义题库1',
            parsed: v1.parsed,
            raw: v1.raw,
            createdAt: Date.now()
          }
        ],
        nextLabelIndex: 2
      }
      localStorage.removeItem(STORAGE_V1)
    } catch {
      /* ignore */
    }
  }

  const bankKey = (entryId: string) => `custom:${entryId}` as const

  const runtimeModuleFor = (id: QuizBankId): QuizRuntimeModuleLoose<QuizResultPayload> | null => {
    if (!id.startsWith('custom:')) return null
    const entryId = id.slice('custom:'.length)
    const entry = entries.value.find(e => e.id === entryId)
    return entry ? buildRuntime(entry) : null
  }

  const loadFromMarkdown = (
    text: string,
    labelBase: (n: number) => string
  ): { ok: true; bankId: QuizBankId } | { ok: false; errors: string[] } => {
    const r = parseCustomQuizMd(text)
    if (!r.ok) return { ok: false, errors: r.errors }

    migrateV1IfNeeded()

    const current = normalizeStoredV2(stored.value)
    const n = current.nextLabelIndex
    const entry: CustomQuizEntry = {
      id: newEntryId(),
      label: labelBase(n),
      parsed: r.data,
      raw: text,
      createdAt: Date.now()
    }
    stored.value = {
      version: 2,
      entries: [...current.entries, entry],
      nextLabelIndex: n + 1
    }
    return { ok: true, bankId: bankKey(entry.id) }
  }

  const removeEntry = (entryId: string) => {
    const cur = normalizeStoredV2(stored.value)
    if (cur.entries.length === 0) return
    const nextEntries = cur.entries.filter(e => e.id !== entryId)
    if (nextEntries.length === 0) {
      stored.value = null
      return
    }
    stored.value = {
      version: 2,
      entries: nextEntries,
      nextLabelIndex: cur.nextLabelIndex
    }
  }

  return {
    entries,
    migrateV1IfNeeded,
    runtimeModuleFor,
    loadFromMarkdown,
    removeEntry,
    bankKey
  }
}
