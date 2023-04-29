import type {
  Company,
  Emission,
  Energy,
  Fuel,
  Investment,
} from '@prisma/client'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type UpdateTypes = Partial<Company & Investment & Fuel & Emission & Energy>
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type StrictUpdateType = {
      id: string
      key: string
      value: number | string | Date
    }
  }
}
