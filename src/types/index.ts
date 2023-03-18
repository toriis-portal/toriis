import type { Document } from '@contentful/rich-text-types'

/* API Types */

export interface UncleanedESG {
  environment_grade: string
  environment_score: number
  environment_level: string
}

/* Contentful Types */

export interface OurRequestsEntry {
  order: number
  title: string
  details: Document
}

export interface LinkEntry {
  name: string
  url: string
}

export interface ListEntry {
  order: number
  details: string
}

export interface RefuteResponseEntry {
  order: number
  details: Document
}

export interface TimelineEntry {
  year: number
  details: string
}

export interface Info {
  landing: Document
  refuteUisResponse: Document
}
