/**
 * @fileoverview 轻量字符串哈希（非加密），用于自定义题库 `definition.id` 后缀区分内容版本。
 */
/** 轻量字符串哈希（浏览器 / Node 通用，非加密） */
export function hashString(s: string): string {
  let h = 5381
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i)!
  }
  return (h >>> 0).toString(16)
}
