import Dexie, { type EntityTable } from 'dexie'

// Database chat entity
export interface DBChat {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
}

// Database message entity - stores parts as JSON
export interface DBMessage {
  id: string
  chatId: string
  role: 'user' | 'assistant' | 'system'
  parts: unknown[] // Serialized message parts
  createdAt: Date
}

// Dexie database class
class ChatDatabase extends Dexie {
  chats!: EntityTable<DBChat, 'id'>
  messages!: EntityTable<DBMessage, 'id'>

  constructor() {
    super('WebPublisherDebuggerDB')

    this.version(1).stores({
      chats: 'id, createdAt, updatedAt',
      messages: 'id, chatId, createdAt',
    })
  }
}

export const db = new ChatDatabase()
