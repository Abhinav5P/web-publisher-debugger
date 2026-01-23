import type { SeoData, SeoIssue, JsonLdItem, HeadingStructure, LinkAnalysis } from '../../shared/types/seo'

export function collectSeoData(): SeoData {
  const issues: SeoIssue[] = []

  // 基本メタタグ
  const title = document.title || null
  const description = getMetaContent('description')
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || null
  const robots = getMetaContent('robots')
  const viewport = getMetaContent('viewport')
  const charset = document.characterSet || null

  // OGP
  const ogp = {
    title: getMetaContent('og:title'),
    description: getMetaContent('og:description'),
    image: getMetaContent('og:image'),
    url: getMetaContent('og:url'),
    type: getMetaContent('og:type'),
    siteName: getMetaContent('og:site_name'),
    locale: getMetaContent('og:locale'),
  }

  // Twitter Card
  const twitter = {
    card: getMetaContent('twitter:card'),
    site: getMetaContent('twitter:site'),
    creator: getMetaContent('twitter:creator'),
    title: getMetaContent('twitter:title'),
    description: getMetaContent('twitter:description'),
    image: getMetaContent('twitter:image'),
  }

  // JSON-LD
  const jsonLd = collectJsonLd()

  // hreflang
  const hreflang = collectHreflang()

  // 見出し構造
  const headings = collectHeadings()

  // リンク分析
  const links = analyzeLinks()

  // バリデーション
  validateSeo(
    { title, description, canonical, robots, ogp, twitter, headings },
    issues
  )

  return {
    title,
    description,
    canonical,
    robots,
    viewport,
    charset,
    ogp,
    twitter,
    jsonLd,
    hreflang,
    headings,
    links,
    issues,
    collectedAt: Date.now(),
    url: window.location.href,
  }
}

function getMetaContent(name: string): string | null {
  // og:xxx や twitter:xxx 形式
  const selector = name.includes(':')
    ? `meta[property="${name}"], meta[name="${name}"]`
    : `meta[name="${name}"]`
  return document.querySelector<HTMLMetaElement>(selector)?.content || null
}

function collectJsonLd(): JsonLdItem[] {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]')
  const items: JsonLdItem[] = []

  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || '')
      const type = data['@type'] || 'Unknown'
      items.push({
        type,
        raw: data,
        isValid: true,
      })
    } catch (e) {
      items.push({
        type: 'ParseError',
        raw: {},
        isValid: false,
        errors: [(e as Error).message],
      })
    }
  })

  return items
}

function collectHreflang(): Array<{ lang: string; href: string }> {
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
  return Array.from(links).map((link) => ({
    lang: link.hreflang,
    href: link.href,
  }))
}

function collectHeadings(): HeadingStructure {
  const result: HeadingStructure = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] }

  for (let i = 1; i <= 6; i++) {
    const key = `h${i}` as keyof HeadingStructure
    const headings = document.querySelectorAll<HTMLHeadingElement>(`h${i}`)
    result[key] = Array.from(headings).map((h) => h.textContent?.trim() || '')
  }

  return result
}

function analyzeLinks(): LinkAnalysis {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href]')
  const currentHost = window.location.host
  let internal = 0
  let external = 0
  let nofollow = 0

  links.forEach((link) => {
    try {
      const url = new URL(link.href)
      if (url.host === currentHost) {
        internal++
      } else {
        external++
      }
      if (link.rel.includes('nofollow')) {
        nofollow++
      }
    } catch {
      // Invalid URL
    }
  })

  return { internal, external, nofollow }
}

interface ValidationData {
  title: string | null
  description: string | null
  canonical: string | null
  robots: string | null
  ogp: {
    title: string | null
    description: string | null
    image: string | null
  }
  twitter: {
    card: string | null
  }
  headings: HeadingStructure
}

function validateSeo(data: ValidationData, issues: SeoIssue[]): void {
  // タイトルチェック
  if (!data.title) {
    issues.push({
      type: 'error',
      category: 'meta',
      code: 'MISSING_TITLE',
      message: 'Page title is missing',
      suggestion: 'Add a <title> tag to your page',
    })
  } else if (data.title.length > 60) {
    issues.push({
      type: 'warning',
      category: 'meta',
      code: 'TITLE_TOO_LONG',
      message: `Title is ${data.title.length} characters (recommended: 50-60)`,
      suggestion: 'Consider shortening your title for better display in search results',
    })
  }

  // Description チェック
  if (!data.description) {
    issues.push({
      type: 'warning',
      category: 'meta',
      code: 'MISSING_DESCRIPTION',
      message: 'Meta description is missing',
      suggestion: 'Add a meta description (150-160 characters recommended)',
    })
  } else if (data.description.length > 160) {
    issues.push({
      type: 'info',
      category: 'meta',
      code: 'DESCRIPTION_TOO_LONG',
      message: `Description is ${data.description.length} characters (recommended: 150-160)`,
    })
  }

  // Canonical チェック
  if (!data.canonical) {
    issues.push({
      type: 'info',
      category: 'meta',
      code: 'MISSING_CANONICAL',
      message: 'Canonical URL is not set',
      suggestion: 'Consider adding a canonical URL to avoid duplicate content issues',
    })
  }

  // OGPチェック
  if (!data.ogp.title || !data.ogp.description || !data.ogp.image) {
    issues.push({
      type: 'warning',
      category: 'ogp',
      code: 'INCOMPLETE_OGP',
      message: 'Open Graph tags are incomplete',
      suggestion: 'Add og:title, og:description, and og:image for better social sharing',
    })
  }

  // Twitter Card チェック
  if (!data.twitter.card) {
    issues.push({
      type: 'info',
      category: 'twitter',
      code: 'MISSING_TWITTER_CARD',
      message: 'Twitter Card is not configured',
      suggestion: 'Add twitter:card meta tag for better Twitter sharing',
    })
  }

  // H1チェック
  if (data.headings.h1.length === 0) {
    issues.push({
      type: 'warning',
      category: 'heading',
      code: 'MISSING_H1',
      message: 'No H1 heading found on the page',
      suggestion: 'Add exactly one H1 heading that describes the page content',
    })
  } else if (data.headings.h1.length > 1) {
    issues.push({
      type: 'warning',
      category: 'heading',
      code: 'MULTIPLE_H1',
      message: `Found ${data.headings.h1.length} H1 headings (recommended: 1)`,
      suggestion: 'Use only one H1 heading per page',
    })
  }
}
