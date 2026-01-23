import { db, type DBChat, type DBMessage } from './index'
import type { ChatMessage } from '@/components/chat/types'

// Generate UUID
export function generateUUID(): string {
  return crypto.randomUUID()
}

// Chat queries
export async function createChat(title: string = 'New Chat'): Promise<DBChat> {
  const now = new Date()
  const chat: DBChat = {
    id: generateUUID(),
    title,
    createdAt: now,
    updatedAt: now,
  }
  await db.chats.add(chat)
  return chat
}

export async function getChatById(id: string): Promise<DBChat | undefined> {
  return db.chats.get(id)
}

export async function getAllChats(): Promise<DBChat[]> {
  return db.chats.orderBy('updatedAt').reverse().toArray()
}

export async function updateChatTitle(id: string, title: string): Promise<void> {
  await db.chats.update(id, { title, updatedAt: new Date() })
}

export async function updateChatTimestamp(id: string): Promise<void> {
  await db.chats.update(id, { updatedAt: new Date() })
}

export async function deleteChat(id: string): Promise<void> {
  await db.transaction('rw', [db.chats, db.messages], async () => {
    await db.messages.where('chatId').equals(id).delete()
    await db.chats.delete(id)
  })
}

// Message queries
export async function saveMessage(
  chatId: string,
  message: ChatMessage
): Promise<DBMessage> {
  const dbMessage: DBMessage = {
    id: message.id,
    chatId,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts,
    createdAt: new Date(),
  }
  await db.messages.put(dbMessage)
  await updateChatTimestamp(chatId)
  return dbMessage
}

export async function saveMessages(
  chatId: string,
  messages: ChatMessage[]
): Promise<void> {
  const baseTime = Date.now()
  const dbMessages: DBMessage[] = messages.map((message, index) => ({
    id: message.id,
    chatId,
    role: message.role as 'user' | 'assistant' | 'system',
    parts: message.parts,
    createdAt: new Date(baseTime + index), // 1msずつずらして順序を保持
  }))

  await db.transaction('rw', [db.messages, db.chats], async () => {
    await db.messages.bulkPut(dbMessages)
    await updateChatTimestamp(chatId)
  })
}

export async function getMessagesByChatId(chatId: string): Promise<DBMessage[]> {
  return db.messages.where('chatId').equals(chatId).sortBy('createdAt')
}

export async function deleteMessagesByChatId(chatId: string): Promise<void> {
  await db.messages.where('chatId').equals(chatId).delete()
}

// Convert DB messages to ChatMessage format
export function convertToUIMessages(dbMessages: DBMessage[]): ChatMessage[] {
  return dbMessages.map((msg) => ({
    id: msg.id,
    role: msg.role,
    parts: msg.parts as ChatMessage['parts'],
    createdAt: msg.createdAt,
  })) as ChatMessage[]
}

// Generate chat title from first user message
export function generateTitleFromMessage(message: ChatMessage): string {
  const textPart = message.parts.find((p) => p.type === 'text')
  if (textPart && 'text' in textPart) {
    const text = textPart.text as string
    // Truncate to first 50 chars
    return text.length > 50 ? `${text.slice(0, 50)}...` : text
  }
  return 'New Chat'
}
