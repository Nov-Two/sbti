/**
 * @fileoverview 站点强调色（Cookie），与 CSS 变量 `--sbti-accent` 联动，供顶栏主题 Popover 使用。
 */
export type AccentId = 'lime' | 'violet' | 'cyan' | 'amber'

const ACCENT_COOKIE = 'sbti-accent'

export const accentIds: readonly AccentId[] = ['lime', 'violet', 'cyan', 'amber']

export const useAccentTheme = () => {
  const cookie = useCookie<AccentId>(ACCENT_COOKIE, {
    default: () => 'lime',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/'
  })

  const accent = computed<AccentId>(() => {
    const v = cookie.value
    return v && accentIds.includes(v) ? v : 'lime'
  })

  const setAccent = (next: AccentId) => {
    cookie.value = next
  }

  return { accent, setAccent }
}
