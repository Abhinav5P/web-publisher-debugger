import React from 'react'
import type { GtmData } from '@/shared/types/gtm'
import { GtmHeader, GtmDataLayer, GtmTags } from './gtm'

interface GtmSectionProps {
  data: GtmData
}

export const GtmSection: React.FC<GtmSectionProps> = ({ data }) => {
  return (
    <>
      <GtmHeader data={data} />
      <GtmDataLayer events={data.dataLayerEvents} />
      <GtmTags tags={data.tagsFired} />
    </>
  )
}
