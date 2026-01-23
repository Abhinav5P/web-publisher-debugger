import React from 'react'
import type { PixelType } from '@/shared/types/analytics'

interface PixelIconProps {
  type: PixelType
  className?: string
}

const iconMap: Record<PixelType, string | null> = {
  facebook: '/icons/facebook.svg',
  twitter: '/icons/x.svg',
  tiktok: '/icons/tiktok.svg',
  linkedin: '/icons/linkedin.svg',
  pinterest: '/icons/pinterest.svg',
  criteo: '/icons/criteo.svg',
  snapchat: '/icons/snapchat.svg',
  other: null,
}

export const PixelIcon: React.FC<PixelIconProps> = ({ type, className = 'h-4 w-4' }) => {
  const icon = iconMap[type]

  if (!icon) {
    return <div className={`${className} bg-muted rounded`} />
  }

  return <img src={icon} alt={type} className={className} />
}
