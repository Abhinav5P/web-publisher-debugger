import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col pt-[72px]">
      <div className="flex-1 w-full max-w-[640px] mx-auto py-8 px-4">
        <main className="space-y-4">
          {children}
        </main>

        <footer className="px-6 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Web Publisher Debugger v0.1.0
          </p>
        </footer>
      </div>
    </div>
  )
}

interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export const SectionCard: React.FC<SectionCardProps> = ({ children, className = '' }) => {
  return (
    <section className={`bg-background border border-border/50 rounded-lg px-6 py-6 ${className}`}>
      {children}
    </section>
  )
}
