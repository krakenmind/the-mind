'use client'

import { Flex, Text } from '@radix-ui/themes'
import { MaterialIcon } from '@/app/components/ui/MaterialIcon'
import { ICON_SIZE_DEFAULT } from '@/app/components/sidebar'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from '@/lib/hooks/use-is-mobile'
import { useLanguageStore } from '@/lib/store/language-store'
import { SUPPORTED_LANGUAGES } from '@/lib/i18n/supported-languages'
import { MenuItem } from './menu-item'

interface SettingsSectionProps {
  onWorkspaceSettings: () => void
  onLanguageToggle: () => void
  isLanguageActive: boolean
  onLogout: () => void
}

/**
 * Top section of the workspace menu — Krakenmind rebrand.
 * Removed: Appearance toggle (light/dark/system). Krakenmind branding
 * is light-only; the toggle was a no-op against the new ThemeProvider.
 *
 * Items: Language · Workspace Settings · Log Out.
 */
export function SettingsSection({
  onWorkspaceSettings,
  onLanguageToggle,
  isLanguageActive,
  onLogout,
}: SettingsSectionProps) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { language } = useLanguageStore()

  const languageLabel = SUPPORTED_LANGUAGES[language].menuName

  return (
    <Flex direction="column" gap="1">
      <MenuItem
        icon={
          <MaterialIcon
            name="language"
            size={ICON_SIZE_DEFAULT}
            color={isLanguageActive ? 'var(--slate-12)' : 'var(--slate-11)'}
          />
        }
        label={
          <Flex align="center" gap="1">
            {t('workspaceMenu.language')}
            <Text style={{ color: 'var(--slate-6)' }}>•</Text>
            <Text size="2" weight="medium" style={{ color: 'var(--slate-10)' }}>
              {languageLabel}
            </Text>
          </Flex>
        }
        isActive={isLanguageActive}
        rightSlot={
          <MaterialIcon
            name="chevron_right"
            size={ICON_SIZE_DEFAULT}
            color={isLanguageActive ? 'var(--slate-12)' : 'var(--slate-11)'}
          />
        }
        onClick={onLanguageToggle}
      />

      {!isMobile && (
        <MenuItem
          icon={
            <MaterialIcon
              name="settings"
              size={ICON_SIZE_DEFAULT}
              color="var(--slate-11)"
            />
          }
          label={t('workspaceMenu.workspaceSettings')}
          href="/workspace/"
          onClick={onWorkspaceSettings}
        />
      )}

      <MenuItem
        icon={
          <MaterialIcon
            name="logout"
            size={ICON_SIZE_DEFAULT}
            color="var(--red-11)"
          />
        }
        label={t('workspaceMenu.logOut')}
        textColor="var(--red-11)"
        onClick={onLogout}
      />
    </Flex>
  )
}
