import React from 'react'
import { Settings2, Link2, Target } from 'lucide-react'
import { Section } from '@/components/common'

interface BidderAliasesProps {
  aliases: Record<string, string>
}

export const BidderAliases: React.FC<BidderAliasesProps> = ({ aliases }) => {
  if (Object.keys(aliases).length === 0) return null

  return (
    <Section title="Bidder Aliases" icon={<Link2 className="h-3.5 w-3.5" />} count={Object.keys(aliases).length}>
      <div className="space-y-0">
        {Object.entries(aliases).map(([alias, original]) => (
          <div key={alias} className="flex items-center justify-between py-1 text-xs border-b border-border/30 last:border-b-0">
            <span className="font-medium">{alias}</span>
            <span className="text-muted-foreground">→ {original}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

interface BidderSettingsProps {
  settings: Record<string, unknown>
}

export const BidderSettings: React.FC<BidderSettingsProps> = ({ settings }) => {
  if (Object.keys(settings).length === 0) return null

  return (
    <Section title="Bidder Settings" icon={<Settings2 className="h-3.5 w-3.5" />} count={Object.keys(settings).length}>
      <div className="space-y-2">
        {Object.entries(settings).map(([bidder, settingsData]) => (
          <div key={bidder} className="bg-muted/30 rounded-md p-2">
            <div className="text-xs font-medium mb-1">{bidder === 'standard' ? 'Standard (Default)' : bidder}</div>
            <pre className="text-[10px] font-mono bg-muted/50 p-2 rounded overflow-x-auto max-h-24 text-muted-foreground">{JSON.stringify(settingsData, null, 2)}</pre>
          </div>
        ))}
      </div>
    </Section>
  )
}

interface AdServerTargetingProps {
  targeting: Record<string, Record<string, string>>
}

export const AdServerTargeting: React.FC<AdServerTargetingProps> = ({ targeting }) => {
  if (Object.keys(targeting).length === 0) return null

  return (
    <Section title="Ad Server Targeting" icon={<Target className="h-3.5 w-3.5" />} count={Object.keys(targeting).length}>
      <div className="space-y-2">
        {Object.entries(targeting).map(([adUnit, targetingData]) => (
          <div key={adUnit} className="bg-muted/30 rounded-md p-2">
            <div className="text-xs font-medium mb-1.5 truncate" title={adUnit}>{adUnit}</div>
            <div className="space-y-0.5">
              {Object.entries(targetingData).map(([key, value]) => (
                <div key={key} className="flex items-center text-[10px]">
                  <span className="text-muted-foreground w-20 shrink-0">{key}</span>
                  <span className="font-mono truncate" title={value}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
