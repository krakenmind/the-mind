'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { UserAvatar } from '@/app/components/ui/user-avatar';
import { Eyebrow } from '@/app/components/editorial/typography';
import { WorkspaceMenu } from '@/app/components/workspace-menu';
import type { OrgInfo } from '@/app/components/workspace-menu';
import { fetchOrgWithLogo } from '@/chat/api';

/**
 * Sidebar footer — organisation selector button + popup menu.
 *
 * Editorial Krakenmind skin: hairline border-top, mono uppercase eyebrow
 * ("ORGANIZACIÓN"), Geist sans for org name, paper-dim hover, no radius.
 *
 * Fetches organisation details on mount (not on popup open) and
 * caches the result for the session.
 */
export function ChatSidebarFooter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [org, setOrg] = useState<OrgInfo | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Fetch org + logo on mount — uses a module-level singleton so the
  // network request fires exactly once regardless of StrictMode double-mount
  // or component remounts across navigation.
  useEffect(() => {
    fetchOrgWithLogo().then(({ org: data, logoUrl }) => {
      if (!data) return;
      setOrg({
        _id: data._id,
        registeredName: data.registeredName,
        shortName: data.shortName,
        domain: data.domain,
        accountType: data.accountType,
        logoUrl,
      });
    });
  }, []);

  const orgLogoUrl = org?.logoUrl ?? null;
  const orgName = org?.shortName || org?.registeredName;

  return (
    <div className="relative border-t border-rule bg-paper">
      <WorkspaceMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        org={org}
        triggerRef={triggerRef}
      />

      <div
        ref={triggerRef}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsMenuOpen((prev) => !prev);
          }
        }}
        className="group flex w-full cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-paper-dim focus:bg-paper-dim focus:outline-none"
      >
        {/* Org avatar — logo if available, else initial */}
        <UserAvatar
          fullName={orgName}
          src={orgLogoUrl}
          size={28}
          radius="none"
        />

        {/* Org meta — eyebrow + name */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Eyebrow tone="dim" className="text-[9.5px] tracking-[0.2em]">
            Organización
          </Eyebrow>
          <span
            className="truncate font-sans text-[13.5px] font-medium leading-tight text-ink"
            title={orgName}
          >
            {orgName ?? '—'}
          </span>
        </div>

        <ChevronsUpDown
          size={14}
          strokeWidth={1.5}
          className="shrink-0 text-ink-dim transition-colors group-hover:text-ink-muted"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
