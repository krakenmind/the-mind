'use client'

import { Theme } from '@radix-ui/themes'
import { Tooltip } from 'radix-ui'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * Krakenmind ThemeProvider — soporta light y dark.
 *
 * Light: paper / ink / abyss / signal (matches landing default).
 * Dark : ink / paper / abyss-soft / signal (matches landing's
 *        Instrumentation section — § 03 Capa operativa).
 *
 * La inversión la hace globals.css remapeando las CSS vars a nivel de
 * `:root.dark`. Acá sólo persistimos preferencia y aplicamos la clase.
 */

const THEME_STORAGE_KEY = 'pipeshub-theme-preference'

type Appearance = 'light' | 'dark'
export type ThemePreference = 'system' | 'light' | 'dark'

interface ThemeContextValue {
  appearance: Appearance
  preference: ThemePreference
  setPreference: (pref: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  appearance: 'light',
  preference: 'system',
  setPreference: () => {},
})

export function useThemeAppearance() {
  return useContext(ThemeContext)
}

function resolveAppearance(pref: ThemePreference): Appearance {
  if (pref === 'light' || pref === 'dark') return pref
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

/**
 * Blocking inline script — antes del primer paint setea la clase correcta
 * sobre <html> para evitar flash of wrong theme.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var k='${THEME_STORAGE_KEY}',p=localStorage.getItem(k)||'system',d=p==='dark'||(p==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
      }}
    />
  )
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [preference, setPreferenceState] = useState<ThemePreference>('system')
  const [appearance, setAppearance] = useState<Appearance>('light')

  useEffect(() => {
    const pref = readStoredPreference()
    const resolved = resolveAppearance(pref)
    setPreferenceState(pref)
    setAppearance(resolved)
    setMounted(true)
  }, [])

  // Si la preferencia es 'system', escuchá cambios del OS.
  useEffect(() => {
    if (!mounted || preference !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setAppearance(e.matches ? 'dark' : 'light')
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [mounted, preference])

  const setPreference = useCallback((pref: ThemePreference) => {
    localStorage.setItem(THEME_STORAGE_KEY, pref)
    setPreferenceState(pref)
    setAppearance(resolveAppearance(pref))
  }, [])

  // Sincroniza la clase y colorScheme con la apariencia resuelta.
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(appearance)
    document.documentElement.style.colorScheme = appearance
  }, [mounted, appearance])

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ appearance, preference, setPreference }}>
      <Theme
        accentColor="jade"
        grayColor="olive"
        appearance={appearance}
        radius="medium"
        data-accent-color="emerald"
      >
        <Tooltip.Provider delayDuration={200} skipDelayDuration={300}>
          {children}
        </Tooltip.Provider>
      </Theme>
    </ThemeContext.Provider>
  )
}
