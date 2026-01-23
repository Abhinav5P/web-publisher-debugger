import React from 'react'
import type { Ga4Data } from '@/shared/types/analytics'
import { Ga4Header, Ga4Events, Ga4ConsentSection } from './ga4'

interface Ga4SectionProps {
  data: Ga4Data | null
}

export const Ga4Section: React.FC<Ga4SectionProps> = ({ data }) => {
  return (
    <>
      <Ga4Header data={data} />
      <Ga4Events events={data?.events ?? []} />
      <Ga4ConsentSection consent={data?.consent ?? null} />
    </>
  )
}
