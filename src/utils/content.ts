import { createClient } from 'contentful'
import type { ContentfulClientApi, ContentTypeCollection } from 'contentful'

import { env } from '../env.mjs'
import type {
  TimelineEntry,
  OurRequestsEntry,
  RefuteResponseEntry,
  ListEntry,
  LinkEntry,
  Info,
} from '../types/index.js'

const homePageEntryTypes = [
  'timeline',
  'request',
  'response',
  'link',
  'list',
  'info',
]

export class ContentWrapper {
  client: ContentfulClientApi

  constructor() {
    this.client = createClient({
      space: env.CONTENTFUL_SPACE_ID,
      accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    })
  }

  // get<T> = async (entity: string) : Promise<T> => {
  //   const client = this.client

  //   const entries = await client.getEntries({
  //     content_type: entity,
  //   })
  //   return entries
  // }

  async get<T>(entity: string): Promise<T> {
    const client = this.client
    const entries = await client.getEntries({ content_type: entity })
    return entries as unknown as T
  }

  getSingleHomePageEntry = async (entity: string) => {
    const client = this.client

    const entries = await client.getEntries({
      content_type: entity,
    })
    return this.sortEntryByType(
      entries.items.map((item) => item.fields),
      entity,
    )
  }

  sortEntryByType = (entries: any, entity: string) => {
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
      case 'info':
        return (entries as Info[])[0] as Info
      default:
        return entries as LinkEntry[]
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
}
