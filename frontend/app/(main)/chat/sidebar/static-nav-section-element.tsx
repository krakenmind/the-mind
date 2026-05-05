'use client';

import { MaterialIcon } from '@/app/components/ui/MaterialIcon';
import { ICON_SIZE_DEFAULT } from '@/app/components/sidebar';
import { cn } from '@/lib/utils/cn';

interface StaticNavSectionElementProps {
  icon: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  accent?: boolean;
}

/**
 * A single navigation menu button in the static upper section.
 * Editorial Krakenmind language — hairline, no rounded, ink/abyss states.
 */
export function StaticNavSectionElement({
  icon,
  label,
  onClick,
  isActive = false,
  accent = false,
}: StaticNavSectionElementProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-2 h-8 px-3',
        'rounded-none transition-colors duration-150 select-none',
        isActive
          ? 'bg-paper-dim text-abyss'
          : 'bg-transparent text-ink-muted hover:bg-paper-dim hover:text-ink',
        accent && !isActive && 'text-abyss',
      )}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-abyss"
        />
      )}
      <MaterialIcon name={icon} size={ICON_SIZE_DEFAULT} />
      <span
        className="font-sans text-left flex-1 truncate"
        style={{
          fontSize: 13.5,
          fontWeight: isActive ? 500 : 400,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </button>
  );
}
