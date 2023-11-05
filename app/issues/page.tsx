import {prisma} from '@/prisma/client'
import IssuesPageCore from './pageCore'
import type {Issue} from '../api/issues/schema'
import {IssueSchema} from '../api/issues/schema'

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany()

  const validatedIssues = issues.map(validateIssue).filter(Boolean) as Issue[]

  return <IssuesPageCore issues={validatedIssues} />
}

// Helper function to validate a single issue
// we need it because zod vs sqlite... or we can ts-ignore, pick your poison.
function validateIssue(issue: unknown): Issue | undefined {
  const result = IssueSchema.safeParse(issue)
  if (result.success) {
    return result.data
  } else {
    console.error(result.error)
  }
}
