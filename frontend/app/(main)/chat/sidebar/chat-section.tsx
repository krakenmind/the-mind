'use client';

import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ChatSectionHeader } from './chat-section-header';
import { ChatSectionElement, StartChatButton, ChatItemSkeleton } from './chat-section-element';
import { SidebarItem } from './sidebar-item';
import { TimeGroup } from './time-group';
import type { Conversation } from '@/chat/types';
import type { PendingConversation } from '@/chat/store';
import type { TimeGroupKey } from './time-group';

interface ChatSectionBaseProps {
  title: string;
  isLoading: boolean;
  hasError: boolean;
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onAdd?: () => void;
  onNewChat: () => void;
  skeletonCount: number;
  /** When true, the section grows to fill available space and scrolls */
  isScrollable?: boolean;
  /** Show "⋯ More" overflow button at the bottom */
  hasMore?: boolean;
  /** Called when "More" button is clicked */
  onMore?: () => void;
  /** Pending conversations to show as "Generating Title…" shimmers in Today group */
  pendingConversations?: PendingConversation[];
  /** When provided, show this text as the empty state instead of StartChatButton */
  emptyStateText?: string;
  /** Agent sidebar: agent-scoped row actions (delete only) */
  agentId?: string;
}

/**
 * Props when time groups are provided (Your Chats mode).
 */
interface TimeGroupedSectionProps extends ChatSectionBaseProps {
  timeGroups: Array<[TimeGroupKey, Conversation[]]>;
  conversations?: never;
}

/**
 * Props when flat conversation list is provided (Shared Chats mode).
 */
interface FlatSectionProps extends ChatSectionBaseProps {
  conversations: Conversation[];
  timeGroups?: never;
}

type ChatSectionProps = TimeGroupedSectionProps | FlatSectionProps;

/**
 * A single chat section — renders a header plus either a flat list
 * or time-grouped conversations, with loading/error/empty states
 * and an optional "More" overflow button.
 */
export function ChatSection({
  title,
  conversations,
  timeGroups,
  isLoading,
  hasError,
  currentConversationId,
  onSelectConversation,
  onAdd,
  onNewChat,
  skeletonCount,
  isScrollable = false,
  hasMore = false,
  onMore,
  pendingConversations = [],
  emptyStateText,
  agentId,
}: ChatSectionProps) {
  const { t } = useTranslation();
  const isTimeGrouped = !!timeGroups;
  const showGenerating = pendingConversations.length > 0;
  const isEmpty = isTimeGrouped
    ? timeGroups.length === 0 && !showGenerating
    : !conversations || conversations.length === 0;

  return (
    <div
      className="flex flex-col"
      style={isScrollable ? { flex: 1, minHeight: 0 } : undefined}
    >
      <ChatSectionHeader
        title={title}
        onAdd={onAdd}
        addAriaLabel={onAdd ? t('chat.newChat') : undefined}
        onTitleClick={hasMore ? onMore : undefined}
      />

      {hasError ? (
        <div className="flex flex-col gap-2 px-3 py-2">
          <span className="font-sans text-xs text-signal">
            {t('chat.failedToLoad')}
          </span>
          <StartChatButton onClick={onNewChat} />
        </div>
      ) : (
        <div
          className={`flex flex-col ${isScrollable ? 'no-scrollbar overflow-y-auto flex-1' : ''}`}
        >
          {isLoading ? (
            /* Skeleton loading state */
            <div className="flex flex-col">
              {Array.from({ length: skeletonCount }, (_, i) => (
                <ChatItemSkeleton key={i} />
              ))}
            </div>
          ) : isEmpty && !showGenerating ? (
            /* Empty state */
            emptyStateText ? (
              <span className="font-sans text-xs text-ink-dim px-3 py-2">
                {emptyStateText}
              </span>
            ) : (
              <StartChatButton onClick={onNewChat} />
            )
          ) : isTimeGrouped ? (
            /* Time-grouped list (Your Chats) */
            <div className="flex flex-col">
              {timeGroups.map(([label, convs]) => (
                <TimeGroup
                  key={label}
                  label={label}
                  conversations={convs}
                  currentConversationId={currentConversationId}
                  onSelectConversation={onSelectConversation}
                  pendingConversations={label === 'Today' ? pendingConversations : undefined}
                  agentId={agentId}
                />
              ))}
              {/* If generating but no groups yet, show a standalone generating group */}
              {showGenerating && timeGroups.length === 0 && (
                <TimeGroup
                  label="Today"
                  conversations={[]}
                  currentConversationId={currentConversationId}
                  onSelectConversation={onSelectConversation}
                  pendingConversations={pendingConversations}
                  agentId={agentId}
                />
              )}
            </div>
          ) : (
            /* Flat list (Shared Chats) */
            <div className="flex flex-col">
              {conversations!.map((conv) => (
                <ChatSectionElement
                  key={conv.id}
                  conversation={conv}
                  isActive={currentConversationId === conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  agentId={agentId}
                />
              ))}
            </div>
          )}

          {/* "⋯ More" overflow button */}
          {hasMore && <MoreButton onClick={onMore} />}
        </div>
      )}
    </div>
  );
}

/**
 * "⋯ More" button shown at the bottom of a section when there are
 * more chats than MAX_VISIBLE_CHATS.
 */
function MoreButton({ onClick }: { onClick?: () => void }) {
  const { t } = useTranslation();
  return (
    <SidebarItem
      icon={
        <MoreHorizontal
          size={16}
          strokeWidth={1.5}
          className="text-ink-muted shrink-0"
        />
      }
      label={t('common.more')}
      onClick={onClick}
    />
  );
}
