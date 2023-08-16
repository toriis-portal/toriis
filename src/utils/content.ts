import { createClient } from 'contentful'
import type { ContentfulClientApi } from 'contentful'

import { env } from '../env.mjs'
import type {
  TimelineEntry,
  OurRequestsEntry,
  RefuteResponseEntry,
  ListEntry,
  LinkEntry,
  HomePageInfo,
  CaseEntry,
  DirtyCompanyEntry,
  FossilFuelPage,
  TakeActionPage,
} from '../types/index.js'

const homePageEntryNames = [
  'timeline',
  'request',
  'response',
  'link',
  'list',
  'info',
]

const fossilFuelPageEntryNames = [
  'fossilFuelPage',
  'case',
  'dirtyCompanies',
  'link',
]

const takeActionPageEntryNames = [
  'takeActionPage',
  'continueTheMomentumEntries',
]

type HomePageEntryType =
  | TimelineEntry
  | OurRequestsEntry
  | RefuteResponseEntry
  | ListEntry
  | LinkEntry
  | HomePageInfo

type FossilFuelPageEntryType =
  | FossilFuelPage
  | CaseEntry
  | DirtyCompanyEntry
  | LinkEntry

type TakeActionPageEntryType = TakeActionPage | ListEntry

export class ContentWrapper {
  client: ContentfulClientApi

  constructor() {
    this.client = createClient({
      space: env.CONTENTFUL_SPACE_ID,
      accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    })
  }

  /**
   * Generic function to get entries of a given type from Contentful
   *
   * @param entity Type of entry
   * @returns Entries in entity type
   */
  async get<T>(entity: string): Promise<T> {
    const client = this.client
    const entries = await client.getEntries({ content_type: entity })
    return entries.items.map((item) => item.fields) as T
  }

  /**
   * Handles type casting, filtering, and sorting for home page entries
   *
   * @param entries Home page entries from Contentful
   * @param entity Type of entry
   * @returns Parsed home page entries
   */
  parseHomePageEntries = (entries: HomePageEntryType[], entity: string) => {
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
        return (entries as HomePageInfo[])[0] as HomePageInfo
    }
  }

  /**
   * Get all entries from Contentful for the home page
   * @returns Home page entries in a map
   */
  getAllHomePageEntries = async () => {
    const homePageEntryMap: Record<
      string,
      HomePageEntryType | HomePageEntryType[]
    > = {}
    await Promise.all(
      homePageEntryNames.map(async (entity) => {
        const results = await this.get<HomePageEntryType[]>(entity).then(
          (entries) => {
            return this.parseHomePageEntries(entries, entity)
          },
        )
        homePageEntryMap[entity] = results
      }),
    )
    return homePageEntryMap
  }

  /**
   * Handles type casting and filtering for fossil fuel page entries
   *
   * @param entries Home page entries from Contentful
   * @param entity Type of entry
   * @returns Parsed home page entries
   */
  parseFossilFuelPageEntries = (
    entries: FossilFuelPageEntryType[],
    entity: string,
  ) => {
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

  /**
   * Get all entries from Contentful for the fossil fuel page
   * @returns Fossil fuel page entries in a map
   */
  getAllFossilFuelPageEntries = async () => {
    const fossilFuelPageEntryMap: Record<
      string,
      FossilFuelPageEntryType | FossilFuelPageEntryType[]
    > = {}
    await Promise.all(
      fossilFuelPageEntryNames.map(async (entity) => {
        const results = await this.get<FossilFuelPageEntryType[]>(entity).then(
          (entries) => {
            return this.parseFossilFuelPageEntries(entries, entity)
          },
        )
        fossilFuelPageEntryMap[entity] = results
      }),
    )
    return fossilFuelPageEntryMap
  }

  /**
   * Handles type casting and filtering for take action page entries
   *
   * @param entries Take action page entries from Contentful
   * @param entity Type of entry
   * @returns Parsed take action page entries
   */
  parseTakeActionPageEntries = (
    entries: TakeActionPageEntryType[],
    entity: string,
  ) => {
    switch (entity) {
      case 'takeActionPage':
        return entries[0] as TakeActionPage
      case 'continueTheMomentumEntries':
        return (entries as ListEntry[]).sort((a, b) => a.order - b.order)
      default:
        return entries
    }
  }

  /**
   * Get all entries from Contentful for the take action page
   * @returns Take action page entries in a map
   */
  getAllTakeActionEntries = async () => {
    const takeActionPageEntryMap: Record<
      string,
      TakeActionPageEntryType | TakeActionPageEntryType[]
    > = {}
    await Promise.all(
      takeActionPageEntryNames.map(async (entity) => {
        const results = await this.get<TakeActionPageEntryType[]>(entity).then(
          (entries) => {
            return this.parseTakeActionPageEntries(entries, entity)
          },
        )
        takeActionPageEntryMap[entity] = results
      }),
    )
    return takeActionPageEntryMap
  }
}
