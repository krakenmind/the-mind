'use client';

import { useMemo } from 'react';
import { Plus, Search, Folder, FileText } from 'lucide-react';
import { useCommandStore } from '@/lib/store/command-store';
import { useTranslation } from 'react-i18next';
import { getModifierSymbol } from '@/lib/utils/platform';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { useMobileSidebarStore } from '@/lib/store/mobile-sidebar-store';
import { SidebarItem } from './sidebar-item';

// ========================================
// Navigation item config
// ========================================

interface NavItem {
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  labelKey: string;
  route: string;
}

/** Primary navigation items — labels resolved via i18n */
const MAIN_NAV_ITEMS: NavItem[] = [
  { icon: Folder, labelKey: 'nav.collections', route: '/knowledge-base/' },
  { icon: FileText, labelKey: 'nav.allRecords', route: '/knowledge-base/?view=all-records' },
];

// ========================================
// Components
// ========================================

/** Editorial keyboard shortcut badge — mono, ink-muted, hairline. */
const KbdBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[10.5px] tracking-[0.04em] text-ink-muted border border-rule-soft px-1.5 py-[1px] bg-paper">
    {children}
  </span>
);

/** Lucide icon wrapper applying the editorial muted/ink stroke. */
const NavIcon = ({
  Icon,
}: {
  Icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}) => (
  <Icon
    size={16}
    strokeWidth={1.5}
    className="text-ink-muted group-hover:text-ink shrink-0"
  />
);

/**
 * Static navigation section — "New Chat" button, Search, Collections, etc.
 */
export function StaticNavSection() {
  const dispatch = useCommandStore((s) => s.dispatch);
  const { t } = useTranslation();
  const modKey = useMemo(() => getModifierSymbol(), []);
  const isMobile = useIsMobile();
  const closeMobileSidebar = useMobileSidebarStore((s) => s.close);

  const handleNewChat = () => {
    if (isMobile) closeMobileSidebar();
    dispatch('newChat');
  };

  const handleOpenSearch = () => {
    dispatch('openCommandPalette');
  };

  return (
    <div className="flex flex-col">
      {/* New Chat — abyss-colored to feel like the primary editorial accent */}
      <SidebarItem
        icon={
          <Plus
            size={16}
            strokeWidth={1.75}
            className="text-abyss shrink-0"
          />
        }
        label={t('chat.newChat')}
        onClick={handleNewChat}
        textColor="var(--color-abyss)"
        fontWeight={500}
      />

      {/* Search Chats — opens command palette (⌘+K) */}
      <SidebarItem
        icon={<NavIcon Icon={Search} />}
        label={t('nav.searchChats')}
        onClick={handleOpenSearch}
        rightSlot={<KbdBadge>{modKey}+K</KbdBadge>}
      />

      {/* Navigation items — hidden on mobile */}
      {!isMobile &&
        MAIN_NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.route}
            icon={<NavIcon Icon={item.icon} />}
            label={t(item.labelKey)}
            href={item.route}
          />
        ))}
    </div>
  );
}
