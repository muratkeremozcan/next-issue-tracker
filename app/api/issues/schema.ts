// schema.ts
import {z} from 'zod'

export const IssueSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).default('OPEN'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Issue = z.infer<typeof IssueSchema>
