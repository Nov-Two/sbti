/**
 * @fileoverview 自定义题库 Markdown：校验「题目 / 得分表 / 计算规则」三块，解析题目与表格单元格（如 猫+4），
 * 题号不全时按 1–10 轮循环补全。与 `generateCustomQuizResult` 共用维度累加逻辑的数据来源。
 */
import type { ParsedCustomQuiz, ParseCustomMdError, ParseCustomMdResult } from '~/types/custom-quiz'
import type { QuizDefinition } from '~/types/quiz'
import { hashString } from '~/utils/hashString'

/** 支持「卷王+3」「猫+4」等；名称至少 1 个字符 */
const CELL_SCORE_RE = /([\u4e00-\u9fffA-Za-z]+(?:型|系)?)\s*\+\s*(\d+)/g

/** 常见简写 → 维度全名（可被子串匹配补全） */
const DEFAULT_ALIAS: Record<string, string> = {
  卷王: '卷王型',
  卷王型: '卷王型',
  韧性: '韧性型',
  韧性型: '韧性型',
  反思: '反思型',
  反思型: '反思型',
  隐忍: '隐忍型',
  隐忍型: '隐忍型',
  迷茫: '迷茫型',
  迷茫型: '迷茫型',
  平衡: '平衡型',
  平衡型: '平衡型',
  抽象怪: '抽象怪',
  杠精: '杠精',
  猫: '猫系',
  猫系: '猫系',
  狗: '狗系',
  狗系: '狗系',
  兔: '兔系',
  兔系: '兔系',
  狐狸: '狐狸系',
  狐狸系: '狐狸系',
  熊: '熊系',
  熊系: '熊系',
  水獭: '水獭系',
  水獭系: '水獭系'
}

export function detectQuestionBlock(md: string): boolean {
  return /^\s*\d+\.\s+\S/m.test(md) && /^\s*[A-Ea-z][.．、:：]\s*\S/m.test(md)
}

export function detectScoreTable(md: string): boolean {
  const lines = md.split(/\n/)
  return lines.some(line => {
    if (!line.includes('|')) return false
    const parts = line.split('|').map(c => c.trim())
    if (parts.length < 3) return false
    if (/题号|题\s*\||#\s*\|/.test(line)) return true
    return parts.some(p => /^[A-Za-z](?:[（(]|$)/.test(p) || /^[A-Ea-z]$/.test(p))
  })
}

export function detectCalculationRules(md: string): boolean {
  const hasTitle =
    /计算规则|计分规则|得分规则|评分规则/.test(md) ||
    /\n\s*[-*]\s*每个类型/.test(md) ||
    /每个类型\s*初始分/.test(md)
  const hasBody =
    /累加|百分比|维度|类型.*分|初始\s*[=＝]\s*0|每题|随机\s*\(|最大分|主类型|参考值|分数最高/.test(
      md
    )
  return hasTitle && hasBody
}

export function validateCustomMdStructure(md: string): { ok: boolean; errors: string[] } {
  const errors: string[] = []
  if (!detectQuestionBlock(md)) errors.push('缺少可识别的「题目」区块（需含编号题与 A/B 类选项）。')
  if (!detectScoreTable(md))
    errors.push('缺少可识别的「得分映射表」（Markdown 表格，含题号与选项列）。')
  if (!detectCalculationRules(md))
    errors.push('缺少可识别的「计算规则」区块（需含累加、百分比或维度计分描述）。')
  return { ok: errors.length === 0, errors }
}

interface ParsedQuestion {
  id: number
  title: string
  options: Record<string, string>
}

function parseQuestionBlocks(md: string): ParsedQuestion[] {
  const lines = md.split(/\n/)
  const out: ParsedQuestion[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i] ?? ''
    const qm = line.match(/^\s*(\d+)\.\s*(.+)$/)
    if (!qm) {
      i++
      continue
    }
    const id = Number(qm[1])
    let title = qm[2]!.trim()
    i++
    const options: Record<string, string> = {}

    while (i < lines.length) {
      const L = lines[i] ?? ''
      if (/^\s*\d+\.\s+/.test(L) && Object.keys(options).length > 0) break
      const om = L.match(/^\s*([A-Za-z])\s*[.．、:：]\s*(.+)$/)
      if (om) {
        options[om[1]!.toUpperCase()] = om[2]!.trim()
        i++
        continue
      }
      if (!L.trim() && Object.keys(options).length > 0) {
        i++
        break
      }
      if (!L.trim()) {
        i++
        continue
      }
      if (Object.keys(options).length === 0) {
        title = `${title}${title.endsWith('？') || title.endsWith('?') ? '' : ''}${L.trim()}`
        i++
        continue
      }
      break
    }

    if (Object.keys(options).length > 0) {
      out.push({ id, title, options })
    }
  }

  return out.sort((a, b) => a.id - b.id)
}

function splitMarkdownRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(s => s.trim())
    .filter(Boolean)
}

function parseMarkdownTable(md: string): { headers: string[]; rows: string[][] } | null {
  const lines = md.split(/\n/)
  const tableLines: string[] = []
  for (const line of lines) {
    if (!line.includes('|')) continue
    if (/^\s*\|[\s\-:|]+\|\s*$/.test(line)) continue
    tableLines.push(line)
  }
  if (tableLines.length < 2) return null

  const headers = splitMarkdownRow(tableLines[0]!)
  const rows: string[][] = []
  for (let r = 1; r < tableLines.length; r++) {
    const cells = splitMarkdownRow(tableLines[r]!)
    if (cells.length >= 2) rows.push(cells)
  }
  if (headers.length < 2 || rows.length === 0) return null
  return { headers, rows }
}

function extractDimensionsFromList(md: string): string[] {
  const section =
    md.match(/\*\*[^*]*(?:维度|核心|类型|小动物)[^*]*\*\*[\s\S]{0,2000}/i) ??
    md.match(/#+\s*.+类型[\s\S]{0,2000}/i)
  const block = section ? section[0] : md
  const out: string[] = []

  const boldLine = /^\s*[-*]\s*\*{1,2}\s*([^*:\s（）]+(?:系|型)?)\s*\*{1,2}\s*[：:]/gm
  let bm: RegExpExecArray | null
  while ((bm = boldLine.exec(block)) !== null) {
    const raw = bm[1]!.trim()
    if (/维度|定义|类型$/.test(raw)) continue
    if (raw.length >= 1 && raw.length <= 16) out.push(raw)
  }

  const lineRe = /^\s*[-*]\s*([^\s*（）\n]+?(?:系|型))(?:[：:（]|$)/gm
  let lm: RegExpExecArray | null
  while ((lm = lineRe.exec(block)) !== null) {
    const raw = lm[1]!.trim().replace(/\*{1,2}/g, '')
    if (/维度|定义|^类型/.test(raw)) continue
    if (raw.length >= 2 && raw.length <= 16) out.push(raw.replace(/（主类型）/g, '').trim())
  }
  return [...new Set(out)].filter(Boolean)
}

function inferDimensionsFromTableCells(md: string): string[] {
  const table = parseMarkdownTable(md)
  if (!table) return []
  const text = table.rows.flat().join(' ')
  const found = new Set<string>()
  CELL_SCORE_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = CELL_SCORE_RE.exec(text)) !== null) {
    const token = m[1]!
    const raw = token.replace(/型$|系$/, '')
    const canonical =
      DEFAULT_ALIAS[token] ??
      DEFAULT_ALIAS[raw] ??
      (token.endsWith('系') || token.endsWith('型') ? token : `${raw}型`)
    found.add(canonical)
  }
  return [...found]
}

function parseCellScores(cell: string, dimensions: string[]): Record<string, number> {
  const out: Record<string, number> = {}
  if (!cell || /^(—|-|无|\/|…|\.\.\.)+$/.test(cell.trim())) return out
  CELL_SCORE_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = CELL_SCORE_RE.exec(cell)) !== null) {
    const token = m[1]!
    const pts = Number(m[2])
    if (!Number.isFinite(pts)) continue
    const raw = token.replace(/型$/, '')
    const canonical =
      DEFAULT_ALIAS[token] ??
      DEFAULT_ALIAS[raw] ??
      DEFAULT_ALIAS[raw + '型'] ??
      dimensions.find(d => d === token) ??
      dimensions.find(d => d.startsWith(raw)) ??
      token
    out[canonical] = (out[canonical] ?? 0) + pts
  }
  return out
}

function mergeDimensionsFromScores(
  dimensions: string[],
  scoreMap: ParsedCustomQuiz['scoreMap']
): string[] {
  const fromScores = new Set<string>()
  for (const q of Object.values(scoreMap)) {
    for (const opt of Object.values(q)) {
      for (const k of Object.keys(opt)) fromScores.add(k)
    }
  }
  return [...new Set([...dimensions, ...fromScores])].sort()
}

/** 表头可为 `A`、`A（猫）`、`A(猫)` 等 */
function headerToOptionKey(header: string): string | null {
  const t = header
    .trim()
    .replace(/^\*{1,2}|_{1,2}/g, '')
    .trim()
  const m = t.match(/^([A-Za-z])/)
  if (!m) return null
  return m[1]!.toUpperCase()
}

function rowHasScores(row: Record<string, Record<string, number>> | undefined): boolean {
  if (!row) return false
  return Object.values(row).some(cell => Object.keys(cell).length > 0)
}

/** 表格只给到部分题号时，按 1–10 题为一轮循环补全（与常见「后续题同理」稿件一致） */
function fillMissingScoresByCycle(
  scoreMap: ParsedCustomQuiz['scoreMap'],
  questions: ParsedQuestion[]
): ParsedCustomQuiz['scoreMap'] {
  const templateIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(id => rowHasScores(scoreMap[id]))
  if (templateIds.length === 0) return scoreMap

  const out: ParsedCustomQuiz['scoreMap'] = { ...scoreMap }
  for (const q of questions) {
    if (rowHasScores(out[q.id])) continue
    const srcId = templateIds[(q.id - 1) % templateIds.length]!
    out[q.id] = JSON.parse(JSON.stringify(scoreMap[srcId])) as Record<
      string,
      Record<string, number>
    >
  }
  return out
}

function parseScoreTable(
  md: string,
  questions: ParsedQuestion[]
): { scoreMap: ParsedCustomQuiz['scoreMap']; dimensions: string[] } | null {
  const table = parseMarkdownTable(md)
  if (!table) return null
  const { headers, rows } = table
  const colKeys: string[] = headers.map(h => {
    const t = h.trim()
    if (/题号|^#$|序号|^No\.?$/i.test(t)) return '__id__'
    const opt = headerToOptionKey(t)
    if (opt) return opt
    return '__skip__'
  })

  const idIdx = colKeys.findIndex(c => c === '__id__')
  if (idIdx === -1) return null

  const optionCols = colKeys
    .map((k, i) => ({ k, i }))
    .filter(x => x.k !== '__id__' && x.k !== '__skip__')

  if (optionCols.length === 0) return null

  const dimensions = [
    ...new Set([...extractDimensionsFromList(md), ...inferDimensionsFromTableCells(md)])
  ].filter(Boolean)

  const scoreMap: ParsedCustomQuiz['scoreMap'] = {}
  const qIds = new Set(questions.map(q => q.id))

  for (const row of rows) {
    const idRaw = row[idIdx]?.trim() ?? ''
    if (!/^\d+$/.test(idRaw)) continue
    const qid = Number(idRaw)
    if (!qIds.has(qid)) continue
    scoreMap[qid] = scoreMap[qid] ?? {}
    for (const { k, i } of optionCols) {
      const cell = row[i] ?? ''
      scoreMap[qid]![k] = parseCellScores(cell, dimensions)
    }
  }

  const filled = fillMissingScoresByCycle(scoreMap, questions)
  const merged = mergeDimensionsFromScores(dimensions, filled)
  return { scoreMap: filled, dimensions: merged }
}

function parseJitter(md: string): { min: number; max: number } {
  const m = md.match(/随机\s*\(\s*(-?\d+)\s*~\s*\+?(-?\d+)\s*\)/)
  if (m) {
    return { min: Number(m[1]), max: Number(m[2]) }
  }
  const m2 = md.match(/[-−](\d+)\s*~\s*\+?(\d+)/)
  if (m2) {
    return { min: -Number(m2[1]), max: Number(m2[2]) }
  }
  return { min: -5, max: 8 }
}

function parseMainDimension(md: string): string | null {
  const plain = md.replace(/\*\*/g, '')
  const ruleLine = plain.split('\n').find(l => /主类型/.test(l))
  if (ruleLine) {
    const a = ruleLine.match(/永远[是为]?\s*([^\s，。\n]+?型)/)
    if (a) return a[1]!.trim()
    const b = ruleLine.match(/主类型(?:是|为)\s*([^\s，。\n]+?型)/)
    if (b) return b[1]!.trim()
  }
  const m2 = plain.match(/主视角[：:]\s*([^\s，。\n]+?型)/)
  if (m2) return m2[1]!.trim()
  return null
}

function parseMaxScores(md: string): Partial<Record<string, number>> {
  const out: Partial<Record<string, number>> = {}
  const block = md.match(/最大分[^：\n]*[：:]\s*([^\n]+)/)
  if (!block) return out
  const seg = block[1]!
  const parts = seg.split(/[、,，]/)
  for (const p of parts) {
    const mm = p.match(/([\u4e00-\u9fff]+型)\s*(\d+)/)
    if (mm) out[mm[1]!] = Number(mm[2])
  }
  return out
}

function computeMaxFromMap(
  scoreMap: ParsedCustomQuiz['scoreMap'],
  dimensions: string[]
): Record<string, number> {
  const max: Record<string, number> = {}
  for (const d of dimensions) max[d] = 0

  for (const qid of Object.keys(scoreMap)) {
    const q = scoreMap[Number(qid)]!
    const perDimMax: Record<string, number> = {}
    for (const d of dimensions) perDimMax[d] = 0
    for (const opt of Object.values(q)) {
      for (const d of dimensions) {
        const v = opt[d] ?? 0
        if (v > perDimMax[d]!) perDimMax[d] = v
      }
    }
    for (const d of dimensions) max[d] = (max[d] ?? 0) + (perDimMax[d] ?? 0)
  }
  return max
}

export function parseCustomQuizMd(raw: string): ParseCustomMdResult | ParseCustomMdError {
  const structural = validateCustomMdStructure(raw)
  if (!structural.ok) return { ok: false, errors: structural.errors }

  const questions = parseQuestionBlocks(raw)
  if (questions.length === 0)
    return { ok: false, errors: ['未能解析出任何题目，请检查编号与选项格式（如 1. … / A. …）。'] }

  const tableTry = parseScoreTable(raw, questions)
  if (!tableTry || Object.keys(tableTry.scoreMap).length === 0) {
    return {
      ok: false,
      errors: [
        '得分映射表无法解析：请使用 Markdown 表格，第一列为题号；选项列表头建议以 A、B、C… 开头（也支持「A（说明）」）；单元格内为「名称+数字」如 猫+4、卷王+3。'
      ]
    }
  }

  const { scoreMap, dimensions } = tableTry
  if (dimensions.length === 0) {
    return {
      ok: false,
      errors: ['未能从表格中解析出任何维度得分，请检查单元格是否为「名称+数字」（如 猫+4）。']
    }
  }

  const mainDimRules = parseMainDimension(raw)
  const jitter = parseJitter(raw)
  const dimensionMaxOverride = parseMaxScores(raw)
  const maxComputed = computeMaxFromMap(scoreMap, dimensions)
  for (const d of dimensions) {
    if (dimensionMaxOverride[d] == null) dimensionMaxOverride[d] = maxComputed[d] ?? 1
  }

  const pref = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const keys = [...new Set(questions.flatMap(q => Object.keys(q.options)))]
  const optionKeys = keys.sort((a, b) => {
    const ia = pref.indexOf(a)
    const ib = pref.indexOf(b)
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
  const definition: QuizDefinition<string> = {
    id: 'custom-md',
    defaultCategory: '自定义测验',
    optionOrder: optionKeys,
    questions: questions.map(q => ({
      id: q.id,
      title: q.title,
      category: '自定义测验',
      options: q.options
    }))
  }

  const id = `custom-${questions.length}-${hashString(raw.slice(0, 2000)).slice(0, 12)}`

  const data: ParsedCustomQuiz = {
    id,
    definition: { ...definition, id },
    scoreMap,
    dimensions,
    mainDimensionFromRules: mainDimRules,
    jitterMin: jitter.min,
    jitterMax: jitter.max,
    dimensionMaxOverride
  }

  return { ok: true, data }
}
