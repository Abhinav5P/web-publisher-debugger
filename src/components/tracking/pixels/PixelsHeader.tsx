import React from 'react'
import type { PixelData } from '@/shared/types/analytics'
import { IconEye } from '@tabler/icons-react'
import { StatBox, StatusIndicator } from '@/components/common'

interface PixelsHeaderProps {
  pixels: PixelData[]
}

export const PixelsHeader: React.FC<PixelsHeaderProps> = ({ pixels }) => {
  const detected = pixels.length > 0
  const uniqueTypes = new Set(pixels.map((p) => p.type)).size
  const totalEvents = pixels.reduce((sum, p) => sum + p.events.length, 0)

  return (
    <div className="p-3 bg-gradient-to-b from-purple-500/10 to-transparent border-t-2 border-purple-500/30">
      <div className="flex items-center gap-2 mb-3">
        <IconEye className="h-4 w-4 text-purple-500" />
        <span className="text-sm font-medium">Tracking Pixels</span>
        <StatusIndicator detected={detected} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <StatBox label="Types" value={uniqueTypes} highlight={uniqueTypes > 0} />
        <StatBox label="IDs" value={pixels.length} highlight={pixels.length > 0} />
        <StatBox label="Events" value={totalEvents} highlight={totalEvents > 0} />
      </div>
    </div>
  )
}

