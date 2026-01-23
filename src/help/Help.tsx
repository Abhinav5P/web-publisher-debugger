import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  Bot,
  Search,
  MonitorPlay,
  BarChart3,
  Database,
  Shield,
  ChevronDown,
  ChevronRight,
  Globe
} from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { PageLayout, SectionCard } from '@/components/common/PageLayout'
import { getContent, detectLanguage } from './content'

const sectionIcons: Record<string, React.ReactNode> = {
  aiAssistant: <Bot className="h-5 w-5" />,
  seo: <Search className="h-5 w-5" />,
  adtech: <MonitorPlay className="h-5 w-5" />,
  tracking: <BarChart3 className="h-5 w-5" />,
  dataStorage: <Database className="h-5 w-5" />,
  permissions: <Shield className="h-5 w-5" />
}

interface CollapsibleSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  items: { title: string; content: string }[]
  defaultOpen?: boolean
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  description,
  icon,
  items,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="text-primary">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-border/50 bg-muted/20">
          <div className="p-4 space-y-4">
            {items.map((item, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const Help: React.FC = () => {
  const [lang, setLang] = useState(detectLanguage)
  const content = getContent(lang)

  const handleBackToSettings = () => {
    window.location.href = 'options.html'
  }

  return (
    <>
      <PageHeader
        title={content.title}
        actions={
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-auto gap-2">
              <Globe className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <PageLayout>
        {/* Back button */}
        <div className="mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToSettings}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {content.backToSettings}
          </Button>
        </div>

        {/* Overview */}
        <SectionCard>
          <h2 className="font-semibold mb-2">{content.sections.overview.title}</h2>
          <p className="text-sm text-muted-foreground">{content.sections.overview.content}</p>
        </SectionCard>

        {/* Sections */}
        {Object.entries(content.sections).map(([key, section]) => {
          if (key === 'overview') return null
          if (!('items' in section)) return null

          return (
            <CollapsibleSection
              key={key}
              title={section.title}
              description={section.description}
              icon={sectionIcons[key] || <Database className="h-5 w-5" />}
              items={section.items}
              defaultOpen={key === 'aiAssistant'}
            />
          )
        })}
      </PageLayout>
    </>
  )
}
