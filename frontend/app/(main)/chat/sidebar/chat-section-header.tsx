'use client';

import { Plus } from 'lucide-react';

interface ChatSectionHeaderProps {
  title: string;
  onAdd?: () => void;
  /** `aria-label` for the add button (required for a11y when `onAdd` is set). */
  addAriaLabel?: string;
  /** Called when the title is clicked (opens "More Chats") */
  onTitleClick?: () => void;
}

/**
 * Editorial section header — mono uppercase trackeado eyebrow,
 * ink-muted color, hairline-thin "+" affordance on the right.
 *
 * Used for "Shared Chats", "Your Chats", "My Agents".
 */
export function ChatSectionHeader({
  title,
  onAdd,
  addAriaLabel,
  onTitleClick,
}: ChatSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between h-8 px-3">
      <button
        type="button"
        onClick={onTitleClick}
        disabled={!onTitleClick}
        className={`font-mono text-[10.5px] uppercase tracking-[0.18em] font-medium text-ink-muted bg-transparent border-0 p-0 ${
          onTitleClick ? 'cursor-pointer hover:text-ink' : 'cursor-default'
        }`}
      >
        {title}
      </button>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          aria-label={addAriaLabel ?? 'Add'}
          className="inline-flex items-center justify-center h-5 w-5 text-ink-muted hover:text-abyss transition-colors rounded-none"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
