import { createClient } from 'contentful'
import type { ContentfulClientApi } from 'contentful'

import { env } from '../env.mjs'
import type { TimelineEntry, OurRequestEntry } from '../types/index.js'

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
    // const contentType = await client
    //   .getContentType('request')
    //   .then((res) => console.log('content type', res))
    return this.parse(
      entries.items.map((item) => item.fields),
      entity,
    )
  }

  parse = (
    entries: TimelineEntry[] | OurRequestEntry[] | any,
    entity: string,
  ) => {
    switch (entity) {
      case 'timeline':
        return (entries as TimelineEntry[]).sort((a, b) => a.year - b.year)
      case 'request':
        return (entries as OurRequestEntry[]).sort((a, b) => a.order - b.order)
      default:
        return entries as TimelineEntry[]
    }
  }
}
