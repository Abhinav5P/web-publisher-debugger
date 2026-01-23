import React from 'react'
import type { GtmData } from '@/shared/types/gtm'
import { IconBox } from '@tabler/icons-react'
import { StatBox } from '@/components/common'

interface GtmHeaderProps {
  data: GtmData
}

export const GtmHeader: React.FC<GtmHeaderProps> = ({ data }) => {
  // Count unique event types
  const uniqueEvents = new Set(data.dataLayerEvents.map((e) => e.event)).size

  return (
    <div className="p-3 bg-gradient-to-b from-blue-500/10 to-transparent border-t-2 border-blue-500/30">
      <div className="flex items-center gap-2 mb-3">
        <IconBox className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">Google Tag Manager</span>
        {data.containerId && (
          <span className="text-xs text-muted-foreground font-mono">{data.containerId}</span>
        )}
        {data.containerVersion && (
          <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">
            v{data.containerVersion}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <StatBox label="Events" value={data.dataLayerEvents.length} highlight={data.dataLayerEvents.length > 0} />
        <StatBox label="Event Types" value={uniqueEvents} />
        <StatBox label="Tags Fired" value={data.tagsFired.length} />
      </div>
    </div>
  )
}
