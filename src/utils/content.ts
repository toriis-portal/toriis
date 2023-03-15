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
} from '../types/index.js'

export class ContentWrapper {
  client: ContentfulClientApi

  constructor() {
    this.client = createClient({
      space: env.CONTENTFUL_SPACE_ID,
      accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    })
  }

  get = async (entity: string) => {
    const client = this.client
    const entries = await client.getEntries({
      content_type: entity,
    })
    return this.parse(
      entries.items.map((item) => item.fields),
      entity,
    )
  }

  parse = (entries: any, entity: string) => {
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
}
