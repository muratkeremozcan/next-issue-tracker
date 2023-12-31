import {z} from 'zod'

// export const IssueSchema = z.object({
//   id: z.number().optional(),
//   title: z.string().min(1).max(255),
//   description: z.string().min(1).max(255),
//   status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).default('OPEN'),
//   createdAt: z.date().optional(),
//   updatedAt: z.date().optional(),
//   assignedToUserId: z.string().optional(),
//   assignedToUser: UserSchema.optional(),
// })

// export type Issue = z.infer<typeof IssueSchema>

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable().optional(),
  image: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const statusOptions = ['OPEN', 'IN_PROGRESS', 'DONE']

export const IssueSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.').max(65535),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).default('OPEN'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  assignedToUserId: z.string().optional(),
  assignedToUser: UserSchema.optional(),
})

export type Issue = z.infer<typeof IssueSchema>

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required.')
    .max(255)
    .optional()
    .nullable(),
})
