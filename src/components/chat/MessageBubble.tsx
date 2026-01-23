import { AnimatedMarkdown } from '@nvq/flowtoken'

export interface UIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  parts: Array<{ type: string; text?: string }>
}

interface MessageBubbleProps {
  message: UIMessage
  isStreaming?: boolean
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isStreaming = false }) => {
  const isUser = message.role === 'user'

  const content = message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="rounded-lg rounded-br-sm p-2 px-4 max-w-[85%] bg-primary text-primary-foreground">
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="text-sm prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:my-1 prose-pre:p-2 prose-pre:bg-background/50 prose-code:text-xs prose-h1:text-base prose-h2:text-sm prose-h3:text-sm md:prose-h1:text-lg md:prose-h2:text-base md:prose-h3:text-sm">
        <AnimatedMarkdown
          content={content}
          animation={isStreaming ? 'fadeIn' : null}
          animationDuration="0.3s"
          animationTimingFunction="ease-out"
          sep="word"
        />
      </div>
    </div>
  )
}
