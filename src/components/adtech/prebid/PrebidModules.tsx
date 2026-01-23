import React from 'react'
import { Package } from 'lucide-react'
import { Section } from '@/components/common'

interface PrebidModulesProps {
  modules: string[]
}

export const PrebidModules: React.FC<PrebidModulesProps> = ({ modules }) => {
  if (modules.length === 0) return null

  return (
    <Section title="Installed Modules" icon={<Package className="h-3.5 w-3.5" />} count={modules.length}>
      <div className="flex flex-wrap gap-1">
        {modules.map((module) => (
          <span key={module} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{module}</span>
        ))}
      </div>
    </Section>
  )
}
