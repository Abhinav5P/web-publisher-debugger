import React, { useState } from 'react'
import type { DataLayerEvent } from '@/shared/types/gtm'
import { IconChevronDown, IconChevronRight, IconLayersUnion } from '@tabler/icons-react'
import { Section } from '@/components/common'

interface GtmDataLayerProps {
  events: DataLayerEvent[]
}

export const GtmDataLayer: React.FC<GtmDataLayerProps> = ({ events }) => {
  if (events.length === 0) return null

  // Group events by type for summary
  const eventCounts = events.reduce(
    (acc, event) => {
      acc[event.event] = (acc[event.event] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <Section title="DataLayer Events" icon={<IconLayersUnion className="h-4 w-4" />} count={events.length} defaultOpen>
      {/* Event type summary */}
      <div className="flex flex-wrap gap-1 mb-3">
        {Object.entries(eventCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8)
          .map(([event, count]) => (
            <span
              key={event}
              className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
            >
              {event} ({count})
            </span>
          ))}
        {Object.keys(eventCounts).length > 8 && (
          <span className="text-[10px] px-1.5 py-0.5 text-muted-foreground">
            +{Object.keys(eventCounts).length - 8} more
          </span>
        )}
      </div>

      {/* Event list */}
      <div className="space-y-1.5 max-h-64 overflow-auto">
        {events.slice().reverse().map((event, idx) => (
          <DataLayerEventItem key={idx} event={event} />
        ))}
      </div>
    </Section>
  )
}

const DataLayerEventItem: React.FC<{ event: DataLayerEvent }> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasData = Object.keys(event.data).length > 0

  return (
    <div className="border border-border/50 rounded overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-2.5 py-1.5 hover:bg-muted/50 text-left"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!hasData}
      >
        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400">
          {event.event}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">
            {new Date(event.timestamp).toLocaleTimeString()}
          </span>
          {hasData && (
            isOpen ? <IconChevronDown className="h-3 w-3 text-muted-foreground" /> : <IconChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </button>
      {isOpen && hasData && (
        <div className="border-t border-border/50 bg-muted/30 p-2">
          <pre className="text-[10px] overflow-auto max-h-32 text-muted-foreground">
            {JSON.stringify(event.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
