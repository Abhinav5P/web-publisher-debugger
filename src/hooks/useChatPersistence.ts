import { useCallback, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import type { ChatMessage } from '@/components/chat/types'
import { db } from '@/db'
import {
  getChatById,
  getAllChats,
  getMessagesByChatId,
  saveMessage,
  saveMessages,
  updateChatTitle,
  deleteChat,
  convertToUIMessages,
  generateTitleFromMessage,
  generateUUID,
} from '@/db/queries'

interface UseChatPersistenceOptions {
  onChatChange?: (chatId: string | null, messages: ChatMessage[]) => void
}

export function useChatPersistence(options?: UseChatPersistenceOptions) {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Live query for chat list
  const chats = useLiveQuery(() => getAllChats(), [])

  // Create new chat and return the ID
  const startNewChat = useCallback(async (): Promise<string> => {
    const id = generateUUID()
    setCurrentChatId(id)
    options?.onChatChange?.(id, [])
    return id
  }, [options])

  // Load existing chat
  const loadChat = useCallback(async (chatId: string): Promise<ChatMessage[]> => {
    setIsLoading(true)
    try {
      const chat = await getChatById(chatId)
      if (!chat) {
        throw new Error(`Chat ${chatId} not found`)
      }

      const dbMessages = await getMessagesByChatId(chatId)
      const messages = convertToUIMessages(dbMessages)

      setCurrentChatId(chatId)
      options?.onChatChange?.(chatId, messages)

      return messages
    } finally {
      setIsLoading(false)
    }
  }, [options])

  // Save user message (called immediately when user sends)
  const saveUserMessage = useCallback(async (
    chatId: string,
    message: ChatMessage
  ): Promise<string> => {
    // Check if chat exists, create if not
    const existingChat = await getChatById(chatId)
    if (!existingChat) {
      // Create new chat with title from first message
      const title = generateTitleFromMessage(message)
      await db.chats.add({
        id: chatId,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    await saveMessage(chatId, message)
    return chatId
  }, [])

  // Save assistant message (called when streaming finishes)
  const saveAssistantMessage = useCallback(async (
    chatId: string,
    message: ChatMessage
  ): Promise<void> => {
    await saveMessage(chatId, message)
  }, [])

  // Save multiple messages at once (for onFinish)
  const saveFinishedMessages = useCallback(async (
    chatId: string,
    messages: ChatMessage[]
  ): Promise<void> => {
    if (messages.length === 0) return
    await saveMessages(chatId, messages)
  }, [])

  // Delete a chat
  const removeChat = useCallback(async (chatId: string): Promise<void> => {
    await deleteChat(chatId)
    if (currentChatId === chatId) {
      setCurrentChatId(null)
      options?.onChatChange?.(null, [])
    }
  }, [currentChatId, options])

  // Rename a chat
  const renameChat = useCallback(async (chatId: string, title: string): Promise<void> => {
    await updateChatTitle(chatId, title)
  }, [])

  return {
    // State
    currentChatId,
    chats: chats ?? [],
    isLoading,

    // Actions
    startNewChat,
    loadChat,
    saveUserMessage,
    saveAssistantMessage,
    saveFinishedMessages,
    removeChat,
    renameChat,

    // Utilities
    generateUUID,
  }
}
