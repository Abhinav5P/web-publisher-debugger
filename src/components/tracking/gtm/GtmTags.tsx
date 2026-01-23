import React from 'react'
import type { GtmTag } from '@/shared/types/gtm'
import { IconTag } from '@tabler/icons-react'
import { Section } from '@/components/common'

interface GtmTagsProps {
  tags: GtmTag[]
}

export const GtmTags: React.FC<GtmTagsProps> = ({ tags }) => {
  if (tags.length === 0) return null

  return (
    <Section title="Tags Fired" icon={<IconTag className="h-4 w-4" />} count={tags.length}>
      <div className="space-y-1.5">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between border border-border/50 rounded px-2.5 py-1.5"
          >
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{tag.name}</div>
              <div className="text-[10px] text-muted-foreground">{tag.type}</div>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded ml-2">
              {tag.firedCount}x
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}
