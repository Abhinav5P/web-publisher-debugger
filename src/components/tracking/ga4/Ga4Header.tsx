import React from 'react'
import type { Ga4Data } from '@/shared/types/analytics'
import { IconChartBar } from '@tabler/icons-react'
import { StatBox, StatusIndicator } from '@/components/common'

interface Ga4HeaderProps {
  data: Ga4Data | null
}

export const Ga4Header: React.FC<Ga4HeaderProps> = ({ data }) => {
  const detected = !!data?.detected
  const measurementId = data?.measurementId ?? null
  const eventsCount = data?.events.length ?? 0
  const configsCount = data?.configs.length ?? 0
  const consentValue = data?.consent ? 'Set' : '-'

  return (
    <div className="p-3 bg-gradient-to-b from-orange-500/10 to-transparent border-t-2 border-orange-500/30">
      <div className="flex items-center gap-2 mb-3">
        <IconChartBar className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-medium">Google Analytics 4</span>
        <StatusIndicator detected={detected} />
        {measurementId && <span className="text-xs text-muted-foreground font-mono">{measurementId}</span>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <StatBox label="Events" value={eventsCount} highlight={eventsCount > 0} />
        <StatBox label="Configs" value={configsCount} />
        <StatBox label="Consent" value={consentValue} />
      </div>
    </div>
  )
}
