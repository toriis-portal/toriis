import type { Document } from '@contentful/rich-text-types'

export interface UncleanedESG {
  environment_grade: string
  environment_score: number
  environment_level: string
}

export interface TimelineEntry {
  year: number
  description: string
}

export interface OurRequestEntry {
  order: number
  title: string
  details: Document
}
