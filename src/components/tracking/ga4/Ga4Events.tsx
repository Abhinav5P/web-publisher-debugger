import React, { useState } from 'react'
import type { Ga4Event } from '@/shared/types/analytics'
import { IconActivity, IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { Section } from '@/components/common'

interface Ga4EventsProps {
  events: Ga4Event[]
}

export const Ga4Events: React.FC<Ga4EventsProps> = ({ events }) => {
  if (events.length === 0) return null

  return (
    <Section title="Events" icon={<IconActivity className="h-4 w-4" />} count={events.length} defaultOpen>
      <div className="space-y-1.5 max-h-64 overflow-auto">
        {events.slice().reverse().map((event, idx) => (
          <EventItem key={idx} event={event} />
        ))}
      </div>
    </Section>
  )
}

const EventItem: React.FC<{ event: Ga4Event }> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasParams = Object.keys(event.params).length > 0
  const isSetEvent = event.name === '__set__'

  return (
    <div className="border border-border/50 rounded overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-2.5 py-1.5 hover:bg-muted/50 text-left"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!hasParams}
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            isSetEvent
              ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
              : 'bg-orange-500/20 text-orange-600 dark:text-orange-400'
          }`}>
            {isSetEvent ? 'set' : event.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">
            {new Date(event.timestamp).toLocaleTimeString()}
          </span>
          {hasParams && (
            isOpen ? <IconChevronDown className="h-3 w-3 text-muted-foreground" /> : <IconChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </button>
      {isOpen && hasParams && (
        <div className="border-t border-border/50 bg-muted/30 p-2">
          <pre className="text-[10px] overflow-auto max-h-32 text-muted-foreground">
            {JSON.stringify(event.params, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
