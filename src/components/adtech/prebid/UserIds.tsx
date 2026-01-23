import React from 'react'
import type { UserIdInfo } from '@/shared/types/prebid'
import { Fingerprint } from 'lucide-react'
import { Section } from '@/components/common'

interface UserIdsProps {
  userIds: UserIdInfo | null
}

export const UserIds: React.FC<UserIdsProps> = ({ userIds }) => {
  if (!userIds || Object.keys(userIds.ids).length === 0) return null

  return (
    <Section title="User IDs" icon={<Fingerprint className="h-3.5 w-3.5" />} count={Object.keys(userIds.ids).length}>
      <div className="space-y-1.5">
        {Object.entries(userIds.ids).map(([key, value]) => (
          <div key={key} className="bg-muted/30 rounded-md p-2">
            <div className="text-xs font-medium mb-0.5">{key}</div>
            <div className="text-[10px] text-muted-foreground font-mono truncate" title={String(value)}>
              {typeof value === 'string' ? value : JSON.stringify(value)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
