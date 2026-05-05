'use client'

import { useThemeAppearance, type ThemePreference } from '@/app/components/theme-provider'
import { useTranslation } from 'react-i18next'
import { SubPanel, SubPanelItem } from './sub-panel'

interface AppearancePanelProps {
  isOpen: boolean
}

/**
 * Sub-panel flotante para elegir apariencia.
 * Krakenmind soporta 'light' (paper/teal — por default) y 'dark' (ink/abyss-soft —
 * inspirado en la sección Instrumentation de la landing). 'system' sigue al OS.
 */
export function AppearancePanel({ isOpen }: AppearancePanelProps) {
  const { preference, setPreference } = useThemeAppearance()
  const { t } = useTranslation()

  const APPEARANCE_OPTIONS: { value: ThemePreference; labelKey: string; icon: string }[] = [
    { value: 'system', labelKey: 'workspaceMenu.system', icon: 'toggle_off' },
    { value: 'light', labelKey: 'workspaceMenu.light', icon: 'light_mode' },
    { value: 'dark', labelKey: 'workspaceMenu.dark', icon: 'mode_night' },
  ]

  return (
    <SubPanel isOpen={isOpen}>
      {APPEARANCE_OPTIONS.map((opt) => (
        <SubPanelItem
          key={opt.value}
          icon={opt.icon}
          label={t(opt.labelKey)}
          isActive={preference === opt.value}
          onClick={() => setPreference(opt.value)}
        />
      ))}
    </SubPanel>
  )
}
