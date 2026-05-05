'use client'

import { Flex, IconButton } from '@radix-ui/themes'
import Link from 'next/link'
import { HEADER_ELEMENT_SIZE } from '@/app/components/sidebar'
import { UserAvatar } from '@/app/components/ui/user-avatar'
import { useUserStore } from '@/lib/store/user-store'
import { useIsMobile } from '@/lib/hooks/use-is-mobile'
import { toast } from '@/lib/store/toast-store'
import { KrakenMark } from '@/app/components/ui'

/**
 * Sidebar header — Kraken mark + wordmark + user avatar.
 * Avatar resolves to the user's profile picture if set, otherwise shows initials.
 */
export function ChatSidebarHeader() {
  const profile = useUserStore((s) => s.profile)
  const isMobile = useIsMobile()

  const avatar = (
    <UserAvatar
      fullName={profile?.fullName}
      firstName={profile?.firstName}
      lastName={profile?.lastName}
      email={profile?.email}
      src={profile?.avatarUrl}
      size={HEADER_ELEMENT_SIZE}
      radius="small"
    />
  )

  return (
    <Flex
      align="center"
      justify="between"
      gap="2"
      style={{ height: '100%', padding: 'var(--space-4)' }}
    >
      <Flex align="center" gap="2">
        <KrakenMark size={HEADER_ELEMENT_SIZE - 2} variant="ink" />
        <span
          style={{
            fontFamily: 'var(--font-fraunces), Fraunces, serif',
            fontSize: '17px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            lineHeight: 1,
          }}
        >
          krakenmind
        </span>
      </Flex>
      {isMobile ? (
        <IconButton
          variant="ghost"
          color="gray"
          aria-label="Open profile"
          onClick={() => {
            toast.info('Coming soon', {
              description: 'Profile page on mobile is coming soon.',
            })
          }}
          style={{ margin: 0, padding: 0, lineHeight: 0, cursor: 'pointer' }}
        >
          {avatar}
        </IconButton>
      ) : (
        <Link
          href="/workspace/profile/"
          aria-label="Open profile"
          style={{ textDecoration: 'none', lineHeight: 0 }}
        >
          {avatar}
        </Link>
      )}
    </Flex>
  )
}
