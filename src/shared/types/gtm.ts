export interface GtmData {
  detected: boolean
  containerId: string | null
  containerVersion: string | null

  // dataLayerイベント
  dataLayerEvents: DataLayerEvent[]

  // タグ発火状況
  tagsFired: GtmTag[]

  // 変数
  variables: GtmVariable[]

  collectedAt: number
}

export interface DataLayerEvent {
  timestamp: number
  event: string
  data: Record<string, unknown>
}

export interface GtmTag {
  id: string
  name: string
  type: string
  firedCount: number
  lastFired: number
}

export interface GtmVariable {
  name: string
  type: string
  value: unknown
}
