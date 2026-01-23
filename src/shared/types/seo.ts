export interface SeoData {
  // 基本メタ
  title: string | null
  description: string | null
  canonical: string | null
  robots: string | null
  viewport: string | null
  charset: string | null

  // OGP
  ogp: {
    title: string | null
    description: string | null
    image: string | null
    url: string | null
    type: string | null
    siteName: string | null
    locale: string | null
  }

  // Twitter Card
  twitter: {
    card: string | null
    site: string | null
    creator: string | null
    title: string | null
    description: string | null
    image: string | null
  }

  // 構造化データ
  jsonLd: JsonLdItem[]

  // 多言語
  hreflang: HreflangEntry[]

  // 見出し構造
  headings: HeadingStructure

  // リンク分析
  links: LinkAnalysis

  // 問題点
  issues: SeoIssue[]

  // メタデータ
  collectedAt: number
  url: string
}

export interface JsonLdItem {
  type: string
  raw: object
  isValid: boolean
  errors?: string[]
}

export interface HreflangEntry {
  lang: string
  href: string
}

export interface HeadingStructure {
  h1: string[]
  h2: string[]
  h3: string[]
  h4: string[]
  h5: string[]
  h6: string[]
}

export interface LinkAnalysis {
  internal: number
  external: number
  nofollow: number
}

export interface SeoIssue {
  type: 'error' | 'warning' | 'info'
  category: 'meta' | 'ogp' | 'twitter' | 'structured-data' | 'heading' | 'link'
  code: string
  message: string
  suggestion?: string
}
