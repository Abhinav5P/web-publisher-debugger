import { useChat as useChatSDK } from '@ai-sdk/react'
import { type LanguageModel, type Tool } from 'ai'
import { useEffect, useRef } from 'react'
import { CustomChatTransport } from './custom-chat-transport'
import { getWeather } from './tools'
import type { ChatMessage } from '@/components/chat/types'

type Tools = Record<string, Tool>

const defaultTools: Tools = {
  getWeather,
}

interface CustomChatOptions {
  experimental_throttle?: number
  onFinish?: (result: { messages: ChatMessage[] }) => void | Promise<void>
  onError?: (error: Error) => void
}

export interface UseChatConfig {
  id?: string
  initialMessages?: ChatMessage[]
}

export function useChat(
  model: LanguageModel,
  systemPrompt?: string,
  options?: CustomChatOptions,
  tools: Tools = defaultTools,
  config?: UseChatConfig
) {
  const transportRef = useRef<CustomChatTransport | null>(null)

  if (!transportRef.current) {
    transportRef.current = new CustomChatTransport(model, systemPrompt, tools)
  }

  useEffect(() => {
    if (transportRef.current) {
      transportRef.current.updateModel(model)
    }
  }, [model])

  useEffect(() => {
    if (transportRef.current && systemPrompt) {
      transportRef.current.updateSystemPrompt(systemPrompt)
    }
  }, [systemPrompt])

  useEffect(() => {
    if (transportRef.current && tools) {
      transportRef.current.updateTools(tools)
    }
  }, [tools])

  const chatResult = useChatSDK<ChatMessage>({
    id: config?.id,
    messages: config?.initialMessages,
    transport: transportRef.current,
    ...options,
  })

  return chatResult
}
