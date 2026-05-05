'use client'

import { Theme } from '@radix-ui/themes'
import { Tooltip } from 'radix-ui'
import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Krakenmind rebrand: light-only.
 * Mantenemos la API del ThemeProvider intacta para no romper consumidores que
 * leen `useThemeAppearance()` o llaman `setPreference()`. Internamente fuerza
 * 'light' siempre — la marca Krakenmind es papel/teal sobre fondo cálido.
 */

type Appearance = 'light' | 'dark'
export type ThemePreference = 'system' | 'light' | 'dark'

interface ThemeContextValue {
  appearance: Appearance
  preference: ThemePreference
  setPreference: (pref: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  appearance: 'light',
  preference: 'light',
  setPreference: () => {},
})

export function useThemeAppearance() {
  return useContext(ThemeContext)
}

/**
 * Blocking inline script: garantiza que <html> tenga la clase correcta antes
 * del primer paint. En light-only es trivial pero lo mantenemos para
 * compatibilidad con scripts que esperan el atributo.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light'}catch(e){}})()`,
      }}
    />
  )
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    document.documentElement.style.colorScheme = 'light'
    document.documentElement.style.setProperty('--page-background', '#ece5d7')
  }, [])

  if (!mounted) return null

  return (
    <ThemeContext.Provider
      value={{
        appearance: 'light',
        preference: 'light',
        setPreference: () => {},
      }}
    >
      <Theme
        accentColor="jade"
        grayColor="olive"
        appearance="light"
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
