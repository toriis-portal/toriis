import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

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
        shouldEmail: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingSignatory = await ctx.prisma.signatory.findUnique({
        where: {
          email: input.email,
        },
      })

      if (existingSignatory) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There is already a signatory with this email.',
        })
      }

      await ctx.prisma.signatory.create({
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
          shouldEmail: input.shouldEmail,
        },
      })

      return {
        success: true,
        message: 'Signatory added',
      }
    }),

  getSignatoriesCount: publicProcedure.query(async ({ ctx }) => {
    const signatoriesCount = await ctx.prisma.signatory.count()
    return signatoriesCount
  }),

  getSignatories: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.signatory.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return items
  }),

  deleteManySignatories: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const deleteSignatories = await ctx.prisma.signatory.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      })
      if (!deleteSignatories) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete signatory',
        })
      }
    }),

  updateSignatoryEmailPreference: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const promises = input.ids.map(async (_id) => {
        const currentEmailVal = await ctx.prisma.signatory.findUnique({
          where: {
            id: _id,
          },
        })

        if (!currentEmailVal) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Failed to retrieve current signatory's email value (id: ${_id})`,
          })
        }

        return ctx.prisma.signatory.update({
          where: {
            id: _id,
          },
          data: {
            shouldEmail: !currentEmailVal.shouldEmail,
          },
        })
      })
      const updateEmailSignatories = await Promise.all(promises)
      if (!updateEmailSignatories) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update signatory emails',
        })
      }
      return updateEmailSignatories
    }),
})
