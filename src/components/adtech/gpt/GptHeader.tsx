import React from 'react'
import type { GptData } from '@/shared/types/gpt'
import { StatBox } from '@/components/common'
import { GamIcon } from './GamIcon'

interface GptHeaderProps {
  data: GptData
}

export const GptHeader: React.FC<GptHeaderProps> = ({ data }) => {
  const renderedSlots = data.slots.filter(s => s.renderInfo && !s.renderInfo.isEmpty).length
  const emptySlots = data.slots.filter(s => s.renderInfo && s.renderInfo.isEmpty).length

  return (
    <div className="p-3 bg-gradient-to-b from-orange-500/10 to-transparent border-t-2 border-orange-500/30">
      <div className="flex items-center gap-2 mb-3">
        <GamIcon className="h-4 w-4" />
        <span className="text-sm font-medium">Google Publisher Tag</span>
        <span className="text-xs text-muted-foreground">{data.version || '?'}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <StatBox label="Total Slots" value={data.slots.length} />
        <StatBox label="Rendered" value={renderedSlots} highlight={renderedSlots > 0} />
        <StatBox label="Empty" value={emptySlots} />
        <StatBox label="Events" value={data.events.length} />
      </div>
    </div>
  )
}
