import type { SbtiDimension } from './questions'

/** 文档标题、免责、主标签后缀等展示用文案（换风格主要改这里） */
export const sbtiResultCopy = {
  documentTitle: '【SB TI · 傻逼人格测试 最终鉴定书】',
  disclaimer: '（本测试纯属整活，别当真，转发给朋友一起破防。）',
  mainTagSuffix: '·究极逆天版',
  eggsHeaderWhenSome: '🥚 隐藏彩蛋：',
  eggsHeaderWhenNone: '🥚 隐藏彩蛋：无（说明你还没到极致）'
} as const

export const sbtiEndingPool: readonly string[] = [
  '你不是一个人在发癫，你是一个群体精神现象。',
  '建议你把“我没事”改成“我有病”。',
  '你的生活像极了段子：别笑，笑的是你。',
  '你不是摆烂，你是在用灵魂对抗现实。',
  '你不是小丑，你是小丑界的天选之人。',
  '你不是冤种，你是冤种里的冤种王中王。'
]

/** 彩蛋触发：维度 + 最低百分比 + 文案 */
export const sbtiHiddenEggRules: readonly {
  dimension: SbtiDimension
  minPercent: number
  text: string
}[] = [
  { dimension: '抽象怪', minPercent: 90, text: '核弹级抽象怪（破防警告）' },
  { dimension: '杠精', minPercent: 80, text: '嘴炮之王（杠到天荒地老）' },
  { dimension: '圣母送钱', minPercent: 85, text: '人形ATM（圣母心溢出）' },
  { dimension: '摆烂自闭', minPercent: 85, text: '终极摆烂（人生已读不回）' },
  { dimension: '修狗冤种', minPercent: 90, text: '究极冤种（修狗の宿命）' },
  { dimension: '小丑帝', minPercent: 80, text: '小丑登基（请自带BGM）' }
]
