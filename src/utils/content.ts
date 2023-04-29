import { createClient } from 'contentful'
import type { ContentfulClientApi } from 'contentful'

import { env } from '../env.mjs'
import type {
  TimelineEntry,
  OurRequestsEntry,
  RefuteResponseEntry,
  ListEntry,
  LinkEntry,
  Info,
  CaseEntry,
  FossilFuelPage,
} from '../types/index.js'

const homePageEntryTypes = [
  'timeline',
  'request',
  'response',
  'link',
  'list',
  'info',
]

const fossilFuelPageEntryTypes = ['fossilFuelPage', 'case', 'link']

export class ContentWrapper {
  client: ContentfulClientApi

  constructor() {
    this.client = createClient({
      space: env.CONTENTFUL_SPACE_ID,
      accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    })
  }

  async get<T>(entity: string): Promise<T> {
    const client = this.client
    const entries = await client.getEntries({ content_type: entity })
    return entries.items.map((item) => item.fields) as T
  }

  getSingleHomePageEntry = async (entity: string) => {
    const client = this.client

    const entries = await client.getEntries({
      content_type: entity,
    })
    return this.parseHomePageEntries(
      entries.items.map((item) => item.fields),
      entity,
    )
  }

  parseHomePageEntries = (entries: any, entity: string) => {
    switch (entity) {
      case 'timeline':
        return (entries as TimelineEntry[]).sort((a, b) => a.year - b.year)
      case 'request':
        return (entries as OurRequestsEntry[]).sort((a, b) => a.order - b.order)
      case 'response':
        return (entries as RefuteResponseEntry[]).sort(
          (a, b) => a.order - b.order,
        )
      case 'list':
        return (entries as ListEntry[]).sort((a, b) => a.order - b.order)
      case 'link':
        return (entries as LinkEntry[]).filter((entry) => entry.type === 'Home')
      default:
        return (entries as Info[])[0] as Info
    }
  }

  getAllHomePageEntries = async () => {
    const homePageEntryMap: Record<
      string,
      | TimelineEntry[]
      | RefuteResponseEntry[]
      | OurRequestsEntry[]
      | ListEntry[]
      | Info
      | LinkEntry[]
    > = {}
    await Promise.all(
      homePageEntryTypes.map(async (entity) => {
        const results = await this.getSingleHomePageEntry(entity)
        homePageEntryMap[entity] = results
      }),
    )
    return homePageEntryMap
  }

  parseFossilFuelPageEntries = (entries: any, entity: string) => {
    switch (entity) {
      case 'fossilFuelPage':
        return (entries as FossilFuelPage[])[0] as FossilFuelPage
      case 'link':
        return (entries as LinkEntry[]).filter(
          (entry) => entry.type === 'FossilFuelPage',
        )
      default:
        return entries as CaseEntry[]
    }
  }

  getSingleFossilFuelPageEntry = async (entity: string) => {
    const client = this.client

    const entries = await client.getEntries({
      content_type: entity,
    })
    return this.parseFossilFuelPageEntries(
      entries.items.map((item) => item.fields),
      entity,
    )
  }

  getAllFossilFuelPageEntries = async () => {
    const fossilFuelPageEntryMap: Record<
      string,
      FossilFuelPage | CaseEntry[] | LinkEntry[]
    > = {}
    await Promise.all(
      fossilFuelPageEntryTypes.map(async (entity) => {
        const results = await this.getSingleFossilFuelPageEntry(entity)
        fossilFuelPageEntryMap[entity] = results
      }),
    )
    return fossilFuelPageEntryMap
  }
}
