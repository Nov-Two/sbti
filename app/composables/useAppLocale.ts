/**
 * @fileoverview 界面语言（Cookie）：`zh-CN` | `en-US`，与 `locales/*` 及 `useAppStrings` 配合。
 */
export type AppLocale = 'zh-CN' | 'en-US'

const LOCALE_COOKIE = 'sbti-locale'

export const useAppLocale = () => {
  const cookie = useCookie<AppLocale>(LOCALE_COOKIE, {
    default: () => 'zh-CN',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/'
  })

  const locale = computed<AppLocale>(() => cookie.value ?? 'zh-CN')

  const setLocale = (next: AppLocale) => {
    cookie.value = next
  }

  return { locale, setLocale }
}
