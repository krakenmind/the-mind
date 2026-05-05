'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { buildChatHref } from '@/chat/build-chat-url';
import { useTranslation } from 'react-i18next';
import { Conversation } from '@/chat/types';
import { useChatStore, isConversationStreamingInScope } from '@/chat/store';
import { ChatApi } from '@/chat/api';
import { AgentsApi } from '@/app/(main)/agents/api';
import { SidebarItem } from './sidebar-item';
import { ChatItemMenu } from './chat-item-menu';
import { DeleteChatDialog, ArchiveChatDialog } from './dialogs';
import { Spinner } from '@/app/components/ui/spinner';

/** Duration must match `typing-reveal` animation duration in globals.css */
const TYPING_ANIMATION_DURATION_MS = 400;

function TypingTitle({ title }: { title: string }) {
  return (
    <span className="title-typing-animation">
      {title}
    </span>
  );
}

/** Title text with a streaming spinner — shared between ChatSectionElement and GeneratingTitleItem. */
function StreamingTitleLabel({ title }: { title: string }) {
  return (
    <span className="flex items-center gap-2 min-w-0 w-full">
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
      <Spinner size={12} color="var(--color-abyss)" />
    </span>
  );
}

interface ChatSectionElementProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  /**
   * When set, this row is an agent conversation — use agent delete API only
   * (rename/archive are not supported for agent chats).
   */
  agentId?: string;
}

/**
 * A single conversation item in the chat sidebar.
 */
export function ChatSectionElement({ conversation, isActive, onClick, agentId }: ChatSectionElementProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(conversation.title);
  const [isSavingRename, setIsSavingRename] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isTypingTitle, setIsTypingTitle] = useState(false);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlConversationId = searchParams?.get('conversationId') ?? null;

  const isConversationStreaming = useChatStore((s) =>
    isConversationStreamingInScope(s.slots, conversation.id, agentId ?? null),
  );

  const convStreamingBlocksSidebarMutation = () =>
    isConversationStreamingInScope(
      useChatStore.getState().slots,
      conversation.id,
      agentId ?? null,
    );

  const newlyResolvedIds = useChatStore((s) => s.newlyResolvedIds);
  const clearNewlyResolvedId = useChatStore((s) => s.clearNewlyResolvedId);

  useEffect(() => {
    if (newlyResolvedIds.has(conversation.id)) {
      setIsTypingTitle(true);
      clearNewlyResolvedId(conversation.id);
      const timer = setTimeout(() => setIsTypingTitle(false), TYPING_ANIMATION_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [newlyResolvedIds]);

  const removeConversation = useChatStore((s) => s.removeConversation);
  const renameConversation = useChatStore((s) => s.renameConversation);
  const bumpConversationsVersion = useChatStore((s) => s.bumpConversationsVersion);

  useEffect(() => {
    if (isRenaming) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [isRenaming]);

  const handleStartRename = () => {
    if (convStreamingBlocksSidebarMutation()) return;
    setRenameValue(conversation.title);
    setIsRenaming(true);
  };

  const handleRenameBlur = async () => {
    if (!isRenaming || isSavingRename) return;
    if (convStreamingBlocksSidebarMutation()) {
      setRenameValue(conversation.title);
      setIsRenaming(false);
      return;
    }
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === conversation.title) {
      setIsRenaming(false);
      return;
    }
    setIsSavingRename(true);
    try {
      if (agentId) {
        await AgentsApi.renameAgentConversation(agentId, conversation.id, trimmed);
      } else {
        await ChatApi.renameConversation(conversation.id, trimmed);
      }
      renameConversation(conversation.id, trimmed);
      bumpConversationsVersion();
    } catch {
      // revert silently
    } finally {
      setIsSavingRename(false);
      setIsRenaming(false);
    }
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      renameInputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (convStreamingBlocksSidebarMutation()) return;
    setIsDeleting(true);
    try {
      if (agentId) {
        await AgentsApi.deleteAgentConversation(agentId, conversation.id);
      } else {
        await ChatApi.deleteConversation(conversation.id);
      }
      removeConversation(conversation.id);
      bumpConversationsVersion();
      setDeleteDialogOpen(false);
      if (urlConversationId === conversation.id) {
        const store = useChatStore.getState();
        const found = agentId
          ? store.getSlotByConvId(conversation.id, { forAgentId: agentId })
          : store.getSlotByConvId(conversation.id, { forAgentId: null });
        if (found) {
          store.evictSlot(found.slotId);
        } else {
          store.clearActiveSlot();
        }
        router.replace(agentId ? buildChatHref({ agentId }) : '/chat/');
      }
    } catch {
      // keep dialog open on error
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmArchive = async () => {
    if (convStreamingBlocksSidebarMutation()) return;
    setIsArchiving(true);
    try {
      if (agentId) {
        await AgentsApi.archiveAgentConversation(agentId, conversation.id);
      } else {
        await ChatApi.archiveConversation(conversation.id);
      }
      removeConversation(conversation.id);
      bumpConversationsVersion();
      setArchiveDialogOpen(false);
      if (urlConversationId === conversation.id) {
        const store = useChatStore.getState();
        const found = agentId
          ? store.getSlotByConvId(conversation.id, { forAgentId: agentId })
          : store.getSlotByConvId(conversation.id, { forAgentId: null });
        if (found) {
          store.evictSlot(found.slotId);
        } else {
          store.clearActiveSlot();
        }
        router.replace(agentId ? buildChatHref({ agentId }) : '/chat/');
      }
    } catch {
      // keep dialog open on error
    } finally {
      setIsArchiving(false);
    }
  };

  // Inline rename mode — render a plain input instead of SidebarItem
  if (isRenaming) {
    return (
      <div className="relative flex items-center h-8 px-3 bg-paper-dim box-border">
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-abyss"
        />
        <input
          ref={renameInputRef}
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onBlur={handleRenameBlur}
          onKeyDown={handleRenameKeyDown}
          disabled={isSavingRename}
          className="flex-1 bg-transparent border-0 outline-none font-sans text-ink"
          style={{
            fontSize: 13.5,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        />
        {isSavingRename && <Spinner size={12} color="var(--color-ink-muted)" />}
      </div>
    );
  }

  const conversationHref = buildChatHref({ agentId, conversationId: conversation.id });

  return (
    <>
      <SidebarItem
        label={
          isConversationStreaming ? (
            <StreamingTitleLabel title={conversation.title} />
          ) : isTypingTitle ? (
            <TypingTitle title={conversation.title} />
          ) : (
            conversation.title
          )
        }
        isActive={isActive}
        href={conversationHref}
        onClick={onClick}
        textColor={isActive ? 'var(--color-abyss)' : 'var(--color-ink)'}
        fontWeight={isActive ? 500 : 400}
        forceHighlight={menuOpen}
        onHoverChange={setIsHovered}
        rightSlot={
          conversation.isOwner === true ? (
            <ChatItemMenu
              isParentHovered={isHovered}
              onOpenChange={setMenuOpen}
              onRename={handleStartRename}
              onArchive={() => setArchiveDialogOpen(true)}
              onDelete={() => setDeleteDialogOpen(true)}
              showRename={true}
              showArchive={true}
            />
          ) : undefined
        }
      />

      {/* Delete confirmation dialog */}
      <DeleteChatDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        chatTitle={conversation.title}
        isDeleting={isDeleting}
      />

      <ArchiveChatDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        onConfirm={handleConfirmArchive}
        chatTitle={conversation.title}
        isArchiving={isArchiving}
      />
    </>
  );
}

/**
 * Sidebar item shown while a new chat is being streamed.
 *
 * Shows the server-provided title from SSE `connected` (pending row updated via store)
 * with a spinner, or "Generating Title…" shimmer until that arrives.
 *
 * Clickable — switches to the streaming temp slot so the user can
 * return to a new chat that's still generating in the background.
 */
export function GeneratingTitleItem({ slotId }: { slotId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentConversationId = searchParams?.get('conversationId') ?? null;
  const activeSlotId = useChatStore((s) => s.activeSlotId);
  const slotConvId = useChatStore((s) => s.slots[slotId]?.convId ?? null);
  const pendingTitle = useChatStore((s) => s.pendingConversations[slotId]?.title ?? null);

  const isActive = slotConvId
    ? currentConversationId === slotConvId
    : activeSlotId === slotId;

  const rawAgent = searchParams?.get('agentId') ?? null;
  const agentId = rawAgent?.trim() ? rawAgent : null;
  const href =
    slotConvId != null && slotConvId !== ''
      ? buildChatHref({ agentId, conversationId: slotConvId })
      : undefined;

  const handleClick = () => {
    useChatStore.getState().setActiveSlot(slotId);
    if (!slotConvId) {
      router.push(agentId ? buildChatHref({ agentId }) : '/chat/');
    }
  };

  if (pendingTitle) {
    return (
      <SidebarItem
        isActive={isActive}
        href={href}
        onClick={handleClick}
        label={<StreamingTitleLabel title={pendingTitle} />}
        textColor={isActive ? 'var(--color-abyss)' : 'var(--color-ink)'}
        fontWeight={isActive ? 500 : 400}
      />
    );
  }

  return (
    <SidebarItem
      isActive={isActive}
      href={href}
      onClick={handleClick}
      label={
        <span className="generating-shimmer">
          <span className="generating-shimmer-base">{t('chat.generatingTitle')}</span>
          <span className="generating-shimmer-overlay" aria-hidden="true">{t('chat.generatingTitle')}</span>
        </span>
      }
      textColor="var(--color-ink-muted)"
      fontWeight={400}
    />
  );
}

/**
 * Empty state — prompts user to start a new chat.
 */
export function StartChatButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <SidebarItem
      icon={
        <Sparkles
          size={16}
          strokeWidth={1.5}
          className="text-abyss shrink-0"
        />
      }
      label={t('chat.startChat')}
      onClick={onClick}
      textColor="var(--color-abyss)"
      fontWeight={500}
    />
  );
}

/**
 * Loading skeleton for a chat item.
 */
export function ChatItemSkeleton() {
  return (
    <SidebarItem
      label={
        <span
          className="block w-3/4"
          style={{
            height: 12,
            backgroundColor: 'var(--color-rule-soft)',
            animation: 'shimmer-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      }
    />
  );
}
