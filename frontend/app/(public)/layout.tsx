'use client'

import React, { useEffect, useState } from 'react'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n/config'
import { useLanguageStore } from '@/lib/store/language-store'
import { ToastContainer } from '@/app/components/feedback'
import { ThemeProvider, ThemeScript } from '@/app/components/theme-provider'
import { AuthHydrator } from '@/lib/store/auth-hydrator'

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

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const language = useLanguageStore((state) => state.language)

  useEffect(() => {
    setMounted(true)
    document.title = 'Krakenmind'
    if (language) {
      import('@/lib/i18n/config').then((module) => {
        module.default.changeLanguage(language)
      })
    }
  }, [language])

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
            {children}
            <ToastContainer />
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  )
}
