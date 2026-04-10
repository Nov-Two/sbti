/**
 * 年轻人社会压力测试 — 题目与得分映射
 * Q1–Q10 映射来自 docs/new.md；Q11–Q30 按文档「后续题同理」复用 Q1–Q10 的得分结构（每 10 题一轮）。
 */
export type StressOption = 'A' | 'B' | 'C' | 'D' | 'E'

export type StressDimension = '韧性型' | '卷王型' | '反思型' | '隐忍型' | '迷茫型' | '平衡型'

export interface StressQuestion {
  id: number
  title: string
  options: Record<StressOption, string>
}

export const stressQuestions: StressQuestion[] = [
  {
    id: 1,
    title: '看到招聘要求“35岁以下”，你会？',
    options: {
      A: '更努力卷',
      B: '有点焦虑但继续投',
      C: '没感觉，随缘',
      D: '心凉，投得少多了',
      E: '彻底不想卷了'
    }
  },
  {
    id: 2,
    title: '朋友晒996还说“热爱工作”，你？',
    options: {
      A: '觉得自己不够努力',
      B: '点赞但心里不舒服',
      C: '没啥感觉',
      D: '心里冷笑',
      E: '很反感'
    }
  },
  {
    id: 3,
    title: '1270万应届生一起找工作，你觉得自己？',
    options: {
      A: '必须冲在前列',
      B: '压力很大但在努力',
      C: '一般般',
      D: '挺难的，有点慌',
      E: '已经躺平'
    }
  },
  {
    id: 4,
    title: '父母催婚，你现在？',
    options: {
      A: '准备尽快解决',
      B: '有点焦虑但在考虑',
      C: '还没想好',
      D: '很抗拒',
      E: '决定不结了'
    }
  },
  {
    id: 5,
    title: '房价和彩礼让你？',
    options: {
      A: '咬牙也要买房结婚',
      B: '努力存钱但很累',
      C: '还没考虑那么远',
      D: '觉得太难了',
      E: '彻底不想背房贷'
    }
  },
  {
    id: 6,
    title: '每天刷到“35岁优化”新闻，你？',
    options: {
      A: '更害怕，拼命学新技能',
      B: '有点焦虑',
      C: '没太大感觉',
      D: '很不安',
      E: '已经麻木'
    }
  },
  {
    id: 7,
    title: '领导让你周末加班，你通常？',
    options: {
      A: '马上答应',
      B: '心里不愿意但会去',
      C: '看情况',
      D: '找借口推掉',
      E: '直接拒绝'
    }
  },
  {
    id: 8,
    title: '看到同龄人晒升职加薪，你？',
    options: {
      A: '更努力对标',
      B: '有点羡慕',
      C: '无感',
      D: '自卑',
      E: '觉得人生没意思'
    }
  },
  {
    id: 9,
    title: '晚上睡不着的时候，你最常想的是？',
    options: {
      A: '明天怎么更卷',
      B: '自己是不是不够优秀',
      C: '随便想想',
      D: '好累想逃离',
      E: '这个社会到底怎么了'
    }
  },
  {
    id: 10,
    title: '父母拿别人家孩子对比你，你？',
    options: {
      A: '暗暗下决心追赶',
      B: '表面答应心里难受',
      C: '习惯了',
      D: '很烦躁',
      E: '彻底叛逆'
    }
  },
  {
    id: 11,
    title: '工作两年后，你最大的感受是？',
    options: {
      A: '越来越有干劲',
      B: '还能接受',
      C: '一般',
      D: '越来越累',
      E: '后悔入职场'
    }
  },
  {
    id: 12,
    title: '看到“躺平”被骂时，你内心？',
    options: {
      A: '觉得躺平不对',
      B: '有点理解',
      C: '无所谓',
      D: '很赞同',
      E: '自己也想躺'
    }
  },
  {
    id: 13,
    title: '你现在的月收入和房价对比？',
    options: {
      A: '努力赚钱买房',
      B: '勉强能看到希望',
      C: '还没想',
      D: '基本没希望',
      E: '完全放弃买房'
    }
  },
  {
    id: 14,
    title: '在公司不敢表达真实想法，主要因为？',
    options: {
      A: '想好好表现',
      B: '怕被针对',
      C: '没必要',
      D: '很压抑',
      E: '彻底不敢说'
    }
  },
  {
    id: 15,
    title: '刷短视频看到别人轻松月入几万，你？',
    options: {
      A: '相信努力就能做到',
      B: '羡慕但不信',
      C: '随便看看',
      D: '更焦虑',
      E: '觉得都是假的'
    }
  },
  {
    id: 16,
    title: '快要30岁了，你最焦虑的事是？',
    options: {
      A: '还没买房买车',
      B: '事业没起色',
      C: '还没什么感觉',
      D: '什么都没准备好',
      E: '对未来完全没信心'
    }
  },
  {
    id: 17,
    title: '当你想辞职时，通常？',
    options: {
      A: '忍着继续干',
      B: '犹豫很久',
      C: '看心情',
      D: '经常想但没行动',
      E: '已经辞过/准备辞'
    }
  },
  {
    id: 18,
    title: '你对“内卷”这个词的感受是？',
    options: {
      A: '必须参与',
      B: '不得不卷',
      C: '一般',
      D: '很反感',
      E: '讨厌透了'
    }
  },
  {
    id: 19,
    title: '朋友聚会聊房价结婚，你一般？',
    options: {
      A: '积极参与讨论',
      B: '跟着聊但心累',
      C: '沉默',
      D: '想逃离话题',
      E: '直接不参加'
    }
  },
  {
    id: 20,
    title: '你觉得自己目前最大的压力来源是？',
    options: {
      A: '自己不够优秀',
      B: '工作和钱',
      C: '都差不多',
      D: '社会和家庭',
      E: '整个环境'
    }
  },
  {
    id: 21,
    title: '看到国家说“青年要奋斗”，你？',
    options: {
      A: '很受鼓舞',
      B: '有点触动',
      C: '没感觉',
      D: '觉得空洞',
      E: '很反感'
    }
  },
  {
    id: 22,
    title: '你现在最想做的事是？',
    options: {
      A: '继续努力',
      B: '休息一段时间',
      C: '不知道',
      D: '逃离现在的生活',
      E: '彻底改变轨道'
    }
  },
  {
    id: 23,
    title: '半夜emo时，你会？',
    options: {
      A: '逼自己振作',
      B: '刷会儿视频转移',
      C: '发呆',
      D: '哭或发脾气',
      E: '觉得人生没救'
    }
  },
  {
    id: 24,
    title: '你对未来的看法是？',
    options: {
      A: '只要努力就会好',
      B: '有点希望',
      C: '走一步看一步',
      D: '比较悲观',
      E: '看不到希望'
    }
  },
  {
    id: 25,
    title: '当你感到压力最大的时候，你通常？',
    options: {
      A: '一个人扛',
      B: '找朋友聊聊',
      C: '忍着',
      D: '想逃避',
      E: '彻底摆烂'
    }
  },
  {
    id: 26,
    title: '你觉得同龄人普遍状态是？',
    options: {
      A: '都在好好奋斗',
      B: '大部分在硬撑',
      C: '各有各的难',
      D: '很多人很累',
      E: '普遍很迷茫'
    }
  },
  {
    id: 27,
    title: '如果能重来，你最想改变的是？',
    options: {
      A: '更早开始卷',
      B: '选个轻松专业',
      C: '不知道',
      D: '不想这么累',
      E: '直接不走普通路'
    }
  },
  {
    id: 28,
    title: '你对“成功”的定义现在是？',
    options: {
      A: '有钱有房有车',
      B: '能过上普通好日子',
      C: '自己开心就好',
      D: '越来越模糊',
      E: '成功太难了'
    }
  },
  {
    id: 29,
    title: '压力大的时候，你会安慰自己？',
    options: {
      A: '再坚持一下就好了',
      B: '很多人比我惨',
      C: '就这样吧',
      D: '真的好累',
      E: '算了不卷了'
    }
  },
  {
    id: 30,
    title: '做完这个测试，你最想对自己说？',
    options: {
      A: '加油，你可以的',
      B: '已经很不错了',
      C: '随缘吧',
      D: '别对自己太苛刻',
      E: '先好好爱自己'
    }
  }
]

const opts: StressOption[] = ['A', 'B', 'C', 'D', 'E']

/** 第 1–10 题得分映射（与 docs/new.md 表格一致） */
const scoreRows1to10: Record<
  number,
  Record<StressOption, Partial<Record<StressDimension, number>>>
> = {
  1: {
    A: { 卷王型: 3 },
    B: { 韧性型: 2 },
    C: { 平衡型: 1 },
    D: { 迷茫型: 2 },
    E: { 迷茫型: 4 }
  },
  2: {
    A: { 卷王型: 3 },
    B: { 隐忍型: 2 },
    C: { 平衡型: 1 },
    D: { 反思型: 2 },
    E: { 反思型: 3 }
  },
  3: {
    A: { 卷王型: 4 },
    B: { 韧性型: 3 },
    C: { 平衡型: 1 },
    D: { 隐忍型: 2 },
    E: { 迷茫型: 4 }
  },
  4: {
    A: { 卷王型: 2 },
    B: { 隐忍型: 3 },
    C: { 平衡型: 2 },
    D: { 反思型: 2 },
    E: { 迷茫型: 3 }
  },
  5: {
    A: { 卷王型: 3 },
    B: { 韧性型: 2 },
    C: { 平衡型: 2 },
    D: { 反思型: 3 },
    E: { 迷茫型: 4 }
  },
  6: {
    A: { 卷王型: 3 },
    B: { 隐忍型: 3 },
    C: { 平衡型: 1 },
    D: { 隐忍型: 2 },
    E: { 迷茫型: 3 }
  },
  7: {
    A: { 卷王型: 4 },
    B: { 隐忍型: 3 },
    C: { 平衡型: 2 },
    D: { 迷茫型: 2 },
    E: { 反思型: 3 }
  },
  8: {
    A: { 卷王型: 3 },
    B: { 隐忍型: 2 },
    C: { 平衡型: 1 },
    D: { 隐忍型: 3 },
    E: { 迷茫型: 3 }
  },
  9: {
    A: { 卷王型: 3 },
    B: { 隐忍型: 3 },
    C: { 平衡型: 1 },
    D: { 迷茫型: 3 },
    E: { 反思型: 4 }
  },
  10: {
    A: { 卷王型: 3 },
    B: { 隐忍型: 3 },
    C: { 平衡型: 2 },
    D: { 反思型: 2 },
    E: { 反思型: 4 }
  }
}

function cloneRow<T>(row: T): T {
  return JSON.parse(JSON.stringify(row)) as T
}

/** 30 题完整映射：11–30 题复用 1–10 题得分模式 */
export const stressScoreMap: Record<
  number,
  Record<StressOption, Partial<Record<StressDimension, number>>>
> = (() => {
  const out: Record<number, Record<StressOption, Partial<Record<StressDimension, number>>>> = {}
  for (let q = 1; q <= 30; q++) {
    const template = ((q - 1) % 10) + 1
    const row = scoreRows1to10[template as keyof typeof scoreRows1to10]
    if (!row) continue
    out[q] = cloneRow(row)
  }
  return out
})()

const allDims: StressDimension[] = ['韧性型', '卷王型', '反思型', '隐忍型', '迷茫型', '平衡型']

/** 各维度理论最大可得分（逐题取该维选项最大贡献再累加） */
export function computeStressDimensionMaxScores(): Record<StressDimension, number> {
  const max: Record<StressDimension, number> = {
    韧性型: 0,
    卷王型: 0,
    反思型: 0,
    隐忍型: 0,
    迷茫型: 0,
    平衡型: 0
  }
  for (let q = 1; q <= 30; q++) {
    const row = stressScoreMap[q]
    if (!row) continue
    for (const dim of allDims) {
      let m = 0
      for (const o of opts) {
        const v = row[o]?.[dim]
        if (typeof v === 'number' && v > m) m = v
      }
      max[dim] += m
    }
  }
  return max
}

export const stressDimensionMaxScore: Record<StressDimension, number> =
  computeStressDimensionMaxScores()
