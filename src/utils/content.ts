import { createClient } from 'contentful'
import type { ContentfulClientApi } from 'contentful'

import { env } from '../env.mjs'

// export const contentClient = createClient({
//   space: env.CONTENTFUL_SPACE_ID,
//   accessToken: env.CONTENTFUL_ACCESS_TOKEN,
// })

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
    const entries = await client.getEntries({ content_type: entity })
    return entries.items.map((item) => item.fields)
  }

  // async get(entity: string, contentfulOptions: any = {}): Promise<unknown[]> {
  //   const client = this.client

  //   const [entries, schema] = await Promise.all([
  //     client.getEntries({
  //       content_type: entity,
  //       ...contentfulOptions,
  //     }),
  //     client.getContentType(entity),
  //   ])

  //   return Promise.all(entries.items.map((entry) => [entry, schema]))
  // }
}
