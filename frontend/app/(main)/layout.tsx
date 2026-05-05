'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import 'react-pdf-highlighter/dist/esm/style/PdfHighlighter.css'
import 'react-pdf-highlighter/dist/esm/style/Highlight.css'
import 'react-pdf-highlighter/dist/esm/style/AreaHighlight.css'
import 'react-pdf-highlighter/dist/esm/style/Tip.css'
import 'react-pdf-highlighter/dist/esm/style/MouseSelection.css'
import { Flex, Box, Text, IconButton } from '@radix-ui/themes'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { ThemeProvider, ThemeScript } from '../components/theme-provider'
import { SWRConfig } from 'swr'
import { axiosFetcher } from '@/lib/api'
import { clearAuthAndRedirectToLogin } from './auth-refresh'
import { UploadProgressTracker } from '../components/upload-progress-tracker'
import { ToastContainer } from '../components/feedback'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n/config'
import { useLanguageStore } from '@/lib/store/language-store'
import { UserProfileInitializer } from './components/user-profile-initializer'
import { UserBackgroundSurvey } from './components/surveys/user-background'
import { OnboardingTour } from './components/tours/onboarding'
import { useOnboardingStore } from './onboarding/store'
import { getOnboardingStatus } from './onboarding/api'
import { useAuthStore } from '@/lib/store/auth-store'
import { useMobileSidebarStore } from '@/lib/store/mobile-sidebar-store'
import { useIsMobile } from '@/lib/hooks/use-is-mobile'
import { AuthGuard } from '@/app/components/ui/auth-guard'
import { HealthGate } from '@/app/components/ui/health-gate'
import { AuthHydrator } from '@/lib/store/auth-hydrator'
import { useUserStore, selectIsProfileInitialized } from '@/lib/store/user-store'
import { FullNameDialog } from './components/full-name-dialog'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()
  const language = useLanguageStore((state) => state.language)

  useEffect(() => {
    setMounted(true)
    if (language) {
      import('@/lib/i18n/config').then((module) => {
        module.default.changeLanguage(language)
      })
    }
  }, [language])

  useEffect(() => {
    document.title = 'Krakenmind'
  }, [])

  const currentLang = mounted ? language : 'en'

  return (
    <html
      lang={currentLang}
      suppressHydrationWarning
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <ThemeScript />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined|Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <AuthHydrator />
            <div className="landscape-block-overlay">
              <MaterialIcon name="screen_rotation" size={48} color="var(--color-ink-muted)" />
              <Text size="3" style={{ color: 'var(--color-ink-muted)', maxWidth: '220px' }}>
                {t('common.rotateLandscape')}
              </Text>
            </div>
            <AuthGuard>
              <HealthGate>
                <AppLayout sidebar={sidebar}>{children}</AppLayout>
              </HealthGate>
            </AuthGuard>
            <ToastContainer />
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  )
}

function AppLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isHydrated = useAuthStore((s) => s.isHydrated)
  const setOnboardingActive = useOnboardingStore((s) => s.setOnboardingActive)
  const openMobileSidebar = useMobileSidebarStore((s) => s.open)
  const isMobile = useIsMobile()

  const profile = useUserStore((s) => s.profile)
  const isProfileInitialized = useUserStore(selectIsProfileInitialized)
  const updateProfile = useUserStore((s) => s.updateProfile)

  const showFullNameDialog =
    isProfileInitialized && (!profile?.fullName || profile.fullName.trim() === '')

  const handleFullNameSuccess = (savedFullName: string) => {
    updateProfile({ fullName: savedFullName })
  }

  useEffect(() => {
    if (window.location.pathname.startsWith('/onboarding')) {
      return
    }
    if (!isHydrated || !isAuthenticated) {
      return
    }
    getOnboardingStatus()
      .then(({ status }) => {
        if (status === 'notConfigured') {
          setOnboardingActive(true)
          router.replace('/onboarding')
        }
      })
      .catch(() => {})
  }, [isHydrated, isAuthenticated])

  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher,
        onError: (error) => {
          if (error?.type === 'AUTHENTICATION_ERROR') {
            clearAuthAndRedirectToLogin(router)
          }
        },
      }}
    >
      <UserProfileInitializer />
      <Flex
        style={{
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--color-paper)',
        }}
      >
        <React.Fragment key="app-sidebar-slot">{sidebar}</React.Fragment>

        <Flex
          key="app-main-column"
          direction="column"
          data-main-content
          style={{ flex: 1, overflow: 'hidden', zIndex: 0, position: 'relative' }}
        >
          {isMobile && (
            <Box
              key="app-mobile-menu-anchor"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 'var(--space-3)',
                zIndex: 100,
              }}
            >
              <IconButton
                variant="ghost"
                color="gray"
                size="2"
                onClick={openMobileSidebar}
                style={{ margin: 0 }}
                aria-label="Open sidebar"
              >
                <MaterialIcon name="menu" size={22} color="var(--color-ink-muted)" />
              </IconButton>
            </Box>
          )}
          <Box
            key="app-main-scroll"
            data-app-main-scroll
            className="no-scrollbar"
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}
          >
            {children}
          </Box>
        </Flex>

        <UploadProgressTracker key="upload-progress-tracker" />
        <FullNameDialog
          key="full-name-dialog"
          open={showFullNameDialog}
          onSuccess={handleFullNameSuccess}
        />
        <UserBackgroundSurvey key="user-background-survey" />
        {process.env.NEXT_PUBLIC_ONBOARDING_TOUR_ACTIVE === 'true' ? (
          <OnboardingTour key="onboarding-tour" />
        ) : null}
      </Flex>
    </SWRConfig>
  )
}
