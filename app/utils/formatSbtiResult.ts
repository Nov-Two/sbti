import type { QuizResultPayload } from '~/types/quiz-result'

export type ResultExportFormat = 'plain' | 'markdown'

/** 导出分享：plain 与生成时的 fullText 一致；markdown 便于粘贴到支持 MD 的编辑器 */
export function formatQuizResultForExport(
  result: QuizResultPayload,
  format: ResultExportFormat
): string {
  if (format === 'plain') {
    return result.fullText
  }

  const lines: string[] = [
    '# 测验结果',
    '',
    `**主标签：** ${result.mainTag.name}（${result.mainTag.percent}%）`,
    '',
    '## TOP 标签',
    '',
    ...result.topTags.map(t => `- ${t.name} — ${t.percent}%`),
    ''
  ]

  if (result.hiddenEggs.length) {
    lines.push('## 隐藏彩蛋', '', ...result.hiddenEggs.map(e => `- ${e}`), '')
  } else {
    lines.push('## 隐藏彩蛋', '', '_无_', '')
  }

  lines.push(`**结尾语：** ${result.ending}`)

  return lines.join('\n')
}

/** @deprecated 使用 formatQuizResultForExport */
export const formatSbtiResultForExport = formatQuizResultForExport
