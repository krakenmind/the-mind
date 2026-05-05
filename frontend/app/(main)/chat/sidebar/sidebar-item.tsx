'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface SidebarItemProps {
  /** Optional left icon (Lucide / MaterialIcon / Image / any ReactNode) */
  icon?: React.ReactNode;
  /** Label text or ReactNode displayed in the item */
  label: React.ReactNode;
  /** Optional content rendered on the right side (e.g., keyboard shortcut badge) */
  rightSlot?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Navigation href — renders as <a> when provided */
  href?: string;
  /** Whether this item is currently selected/active */
  isActive?: boolean;
  /** Text color override (Tailwind class). Default uses ink/abyss editorial mapping. */
  textColor?: string;
  /** Font weight (default: 400) */
  fontWeight?: number;
  /** Force the highlighted (hovered) visual state (e.g. when a child dropdown is open) */
  forceHighlight?: boolean;
  /** Callback when hover state changes */
  onHoverChange?: (isHovered: boolean) => void;
}

/**
 * Editorial sidebar item — Krakenmind paper/teal language.
 *
 * Visual rules:
 *  - No rounded radius (spreadsheet feel).
 *  - Default: transparent bg, ink-muted text.
 *  - Hover: bg-paper-dim, text-ink.
 *  - Active: bg-paper-dim + 2px abyss left bar + text-abyss medium.
 *  - Right slot reserved for count chips / kbd badges / row menus.
 */
export function SidebarItem({
  icon,
  label,
  rightSlot,
  onClick,
  href,
  isActive = false,
  textColor,
  fontWeight,
  forceHighlight = false,
  onHoverChange,
}: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const highlighted = isHovered || forceHighlight;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  // Editorial visual states. Active wins over hover; hover wins over default.
  const stateClass = isActive
    ? 'bg-paper-dim text-abyss'
    : highlighted
      ? 'bg-paper-dim text-ink'
      : 'bg-transparent text-ink-muted';

  const containerClass = cn(
    'group relative flex w-full items-center gap-2 select-none',
    // 32px tall, 12px horizontal padding
    'h-8 px-3 box-border flex-shrink-0',
    // No rounded — editorial spreadsheet feel
    'rounded-none',
    'transition-colors duration-150',
    stateClass,
    (onClick || href) ? 'cursor-pointer' : 'cursor-default',
  );

  const labelStyle: React.CSSProperties = {
    flex: 1,
    fontSize: 13.5,
    fontWeight: fontWeight ?? (isActive ? 500 : 400),
    lineHeight: 1.4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    ...(textColor ? { color: textColor } : {}),
  };

  const labelContent = typeof label === 'string' ? (
    <span className="font-sans" style={labelStyle}>{label}</span>
  ) : (
    <div className="font-sans" style={{ ...labelStyle, whiteSpace: 'normal' }}>
      {label}
    </div>
  );

  // 2px abyss left bar for active state
  const activeBar = isActive ? (
    <span
      aria-hidden="true"
      className="absolute left-0 top-0 bottom-0 w-[2px] bg-abyss"
    />
  ) : null;

  const content = (
    <>
      {activeBar}
      {icon}
      {labelContent}
      {rightSlot}
    </>
  );

  if (href) {
    const handleLinkClick = (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      onClick?.();
    };

    // Never nest interactive controls (e.g. menu triggers) inside <a> — invalid HTML
    // and clicks can still activate the link / full navigation in the browser.
    if (rightSlot) {
      return (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(containerClass, 'px-0')}
        >
          {activeBar}
          <Link
            href={href}
            onClick={handleLinkClick}
            className="flex flex-1 min-w-0 items-center gap-2 h-full pl-3 no-underline text-inherit"
          >
            {icon}
            {labelContent}
          </Link>
          <span
            className="flex-shrink-0 inline-flex items-center pr-3 h-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {rightSlot}
          </span>
        </div>
      );
    }

    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(containerClass, 'no-underline text-inherit')}
      >
        {content}
      </Link>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={containerClass}
    >
      {content}
    </div>
  );
}
