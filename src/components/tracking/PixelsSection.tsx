import React from 'react'
import type { PixelData } from '@/shared/types/analytics'
import { PixelsGrid } from './pixels/PixelsGrid'
import { PixelsHeader } from './pixels/PixelsHeader'

interface PixelsSectionProps {
  pixels: PixelData[]
}

export const PixelsSection: React.FC<PixelsSectionProps> = ({ pixels }) => {
  return (
    <>
      <PixelsHeader pixels={pixels} />
      <div className="p-3">
        <PixelsGrid pixels={pixels} />
      </div>
    </>
  )
}
