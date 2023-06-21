import type { Document } from '@contentful/rich-text-types'
import type {
  Company,
  Emission,
  Energy,
  Fuel,
  Investment,
} from '@prisma/client'
import type { Asset } from 'contentful'

/* API Types */

export interface UncleanedESG {
  environment_grade: string
  environment_score: number
  environment_level: string
}

export type UpdateType = Partial<
  Company & Investment & Fuel & Emission & Energy
>

/* Contentful Types */

export interface OurRequestsEntry {
  order: number
  title: string
  details: Document
}

export interface LinkEntry {
  name: string
  url: string
  type: 'Home' | 'FossilFuelPage'
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

export interface HomePageInfo {
  landing: Document
  refuteUisResponse: Document
}

export interface CaseEntry {
  title: string
  details: Document
  url: string
}

export interface DirtyCompanyEntry {
  companyName: string
  details: Document
  url: string
}

export interface IndustryEntry {
  name: string
  details?: string
}

export interface SectorEntry {
  name: string
  details?: Document
  avgGrade?: string
}

export interface FossilFuelPage {
  treeMap: Asset
  uofIInvestments: Document
  whyAreFossilFuelsBad: Document
  climateClock: Document
  warmingMeans: Document
  warmingSource: Document
  divestmentCase: Document
  divestmentGraph: Asset
  divestmentSource: Document
  divestedSchools: string
  divestedSchoolsNew: Document
  divestedInstitutions: string
}

export interface CompanyDetailsEntry {
  name: string
  description: Document
}
