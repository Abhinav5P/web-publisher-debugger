// Google Publisher Tag (GPT) / Google Ad Manager (GAM) 型定義

export interface GptData {
  detected: boolean
  version: string | null

  // スロット情報
  slots: GptSlot[]

  // ページレベルターゲティング
  pageTargeting: Record<string, string[]>

  // 設定
  config: {
    initialLoadDisabled: boolean
    singleRequest: boolean  // SRA
    lazyLoadEnabled: boolean
    privacySettingsToken: string | null
  }

  // イベント履歴
  events: GptEvent[]

  collectedAt: number
}

export interface GptSlot {
  slotElementId: string
  adUnitPath: string
  sizes: GptSize[]
  targeting: Record<string, string[]>

  // レスポンス情報（レンダリング後のみ有効）
  responseInfo: GptResponseInfo | null

  // レンダリング結果
  renderInfo: GptRenderInfo | null
}

export interface GptSize {
  width: number | 'fluid'
  height: number | 'fluid'
}

export interface GptResponseInfo {
  advertiserId: number | null
  campaignId: number | null
  creativeId: number | null
  lineItemId: number | null
  sourceAgnosticCreativeId: number | null
  sourceAgnosticLineItemId: number | null
  isBackfill: boolean
  creativeTemplateId: number | null
}

export interface GptRenderInfo {
  isEmpty: boolean
  size: [number, number] | null
  renderedAt: number
}

export interface GptEvent {
  eventType: GptEventType
  timestamp: number
  slotElementId: string
  data: unknown
}

export type GptEventType =
  | 'slotRequested'
  | 'slotResponseReceived'
  | 'slotRenderEnded'
  | 'slotOnload'
  | 'impressionViewable'
  | 'slotVisibilityChanged'

// slotRenderEnded イベントの詳細データ
export interface SlotRenderEndedData {
  slot: unknown  // Slot object
  isEmpty: boolean
  size: [number, number] | null
  advertiserId: number | null
  campaignId: number | null
  creativeId: number | null
  lineItemId: number | null
  sourceAgnosticCreativeId: number | null
  sourceAgnosticLineItemId: number | null
  isBackfill: boolean
  creativeTemplateId: number | null
  serviceName: string
  companyIds: number[]
  labelIds: number[]
  yieldGroupIds: number[]
}
