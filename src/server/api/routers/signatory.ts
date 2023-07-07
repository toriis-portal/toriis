import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const signatoryRouter = createTRPCRouter({
  addSignatory: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        title: z.string().array(),
        institution: z.string().array(),
        email: z.string(),
        city: z.string().nullish(),
        country: z.string().nullish(),
        zipCode: z.number().nullish(),
        bioLink: z.string().nullish(),
        twitter: z.string().nullish(),
        optIn: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingSignatory = await ctx.prisma.signatories.findUnique({
        where: {
          email: input.email,
        },
      })

      if (existingSignatory) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There is already a signatory with this email',
        })
      }

      await ctx.prisma.signatories.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          title: input.title,
          institution: input.institution,
          email: input.email,
          city: input.city,
          country: input.country,
          zipCode: input.zipCode,
          bioLink: input.bioLink,
          twitter: input.twitter,
          optIn: input.optIn,
        },
      })

      return {
        success: true,
        message: 'Signatory added',
      }
    }),

  getSignatoriesCount: publicProcedure.query(async ({ ctx }) => {
    const signatoriesCount = await ctx.prisma.signatories.count()
    return signatoriesCount
  }),
})
