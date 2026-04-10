/**
 * @fileoverview 全站文案：根据 `useAppLocale` 在 zh-CN / en-US 两套 `AppMessages` 间切换。
 */
import { enUS } from '~/locales/en-US'
import { zhCN, type AppMessages } from '~/locales/zh-CN'

/** 随 `useAppLocale()` 的 cookie 切换中英文 */
export const useAppStrings = () => {
  const { locale } = useAppLocale()
  return computed<AppMessages>(() => (locale.value === 'en-US' ? enUS : zhCN))
}
