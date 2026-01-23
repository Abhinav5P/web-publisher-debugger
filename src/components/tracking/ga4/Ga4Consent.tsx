import React from 'react'
import type { Ga4Consent } from '@/shared/types/analytics'
import { IconShield } from '@tabler/icons-react'
import { Section, ConfigRow } from '@/components/common'

interface Ga4ConsentProps {
  consent: Ga4Consent | null
}

export const Ga4ConsentSection: React.FC<Ga4ConsentProps> = ({ consent }) => {
  if (!consent) return null

  const consentLabels: Record<string, string> = {
    ad_storage: 'Ad Storage',
    ad_user_data: 'Ad User Data',
    ad_personalization: 'Ad Personalization',
    analytics_storage: 'Analytics Storage',
    wait_for_update: 'Wait for Update',
  }

  return (
    <Section title="Consent" icon={<IconShield className="h-4 w-4" />}>
      <div className="space-y-1">
        <ConfigRow
          label="Type"
          value={
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${
              consent.type === 'default'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                : 'bg-green-500/20 text-green-600 dark:text-green-400'
            }`}>
              {consent.type}
            </span>
          }
        />
        {Object.entries(consent.params).map(([key, value]) => {
          if (key === 'wait_for_update' && typeof value === 'number') {
            return <ConfigRow key={key} label={consentLabels[key] || key} value={`${value}ms`} />
          }
          const isGranted = value === 'granted'
          return (
            <ConfigRow
              key={key}
              label={consentLabels[key] || key}
              value={
                <span className={`inline-flex items-center gap-1 ${
                  isGranted ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isGranted ? 'bg-green-500' : 'bg-red-500'}`} />
                  {String(value)}
                </span>
              }
            />
          )
        })}
      </div>
    </Section>
  )
}
