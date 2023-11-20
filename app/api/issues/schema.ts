import {z} from 'zod'

// Forward declaration of UserSchema to resolve circular dependency
export const UserSchema: z.ZodSchema<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    emailVerified: z.date().optional(),
    image: z.string().optional(),
    assignedIssues: z.array(IssueSchema),
  }),
)

export type User = z.infer<typeof UserSchema>

export const IssueSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).default('OPEN'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  assignedToUserId: z.string().optional(),
  assignedToUser: UserSchema.optional(),
})

export type Issue = z.infer<typeof IssueSchema>
