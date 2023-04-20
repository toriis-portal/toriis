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
}
