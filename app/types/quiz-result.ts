/**
 * @fileoverview 测验结果统一载荷：主标签、TOP 列表、彩蛋与导出全文。
 * 内置题与自定义 Markdown 题最终都归一为 `QuizResultPayload`，便于 `QuizResult` 与复制导出。
 */

/** 测验结果展示与导出共用结构（SBTI / 年轻人压力等） */
export interface QuizResultTag {
  name: string
  percent: number
}

export interface QuizResultPayload {
  mainTag: QuizResultTag
  topTags: QuizResultTag[]
  hiddenEggs: string[]
  ending: string
  fullText: string
}
