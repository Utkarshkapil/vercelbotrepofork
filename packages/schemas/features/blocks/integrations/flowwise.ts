import { z } from 'zod'
import { blockBaseSchema } from '../baseSchemas'
import { IntegrationBlockType } from './enums'
import { webhookOptionsSchema } from './webhook/schemas'

export const flowwiseBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([IntegrationBlockType.FLOWWISE]),
    options: webhookOptionsSchema,
    webhookId: z
      .string()
      .describe('Deprecated, use webhook.id instead')
      .optional(),
  })
)
export type FlowwiseBlock = z.infer<typeof flowwiseBlockSchema>
