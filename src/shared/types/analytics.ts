export interface AnalyticsData {
  ga4: Ga4Data | null
  pixels: PixelData[]
  collectedAt: number
}

export interface Ga4Data {
  detected: boolean
  measurementId: string | null
  events: Ga4Event[]
  configs: Ga4Config[]
  consent: Ga4Consent | null
}

export interface Ga4Event {
  timestamp: number
  name: string
  params: Record<string, unknown>
}

export interface Ga4Config {
  timestamp: number
  targetId: string
  config: Record<string, unknown>
}

export interface Ga4Consent {
  timestamp: number
  type: 'default' | 'update'
  params: {
    ad_storage?: 'granted' | 'denied'
    ad_user_data?: 'granted' | 'denied'
    ad_personalization?: 'granted' | 'denied'
    analytics_storage?: 'granted' | 'denied'
    wait_for_update?: number
    [key: string]: unknown
  }
}

// Pixel Types
export type PixelType =
  | 'facebook'
  | 'twitter'
  | 'tiktok'
  | 'linkedin'
  | 'pinterest'
  | 'criteo'
  | 'snapchat'
  | 'other'

export interface PixelData {
  type: PixelType
  id: string
  events: PixelEvent[]
}

export interface PixelEvent {
  timestamp: number
  eventName: string
  params: Record<string, unknown>
}

// Pixel display names and colors for UI
export const PIXEL_INFO: Record<PixelType, { name: string; color: string }> = {
  facebook: { name: 'Meta Pixel', color: 'blue' },
  twitter: { name: 'X Pixel', color: 'black' },
  tiktok: { name: 'TikTok Pixel', color: 'pink' },
  linkedin: { name: 'LinkedIn Insight', color: 'blue' },
  pinterest: { name: 'Pinterest Tag', color: 'red' },
  criteo: { name: 'Criteo OneTag', color: 'orange' },
  snapchat: { name: 'Snap Pixel', color: 'yellow' },
  other: { name: 'Other Pixel', color: 'gray' },
}
