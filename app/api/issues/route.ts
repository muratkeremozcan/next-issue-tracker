import {NextResponse, type NextRequest} from 'next/server'
import {IssueSchema, type Issue} from './schema'
import {prisma} from '@/prisma/client'

// need to have an argument (although not used) to prevent NextJs caching the result
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany()

  return NextResponse.json(issues, {status: 200})
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {id, title, description, status}: Issue = body

  if (!['OPEN', 'IN_PROGRESS', 'DONE'].includes(status)) {
    return NextResponse.json({message: 'Invalid status'}, {status: 400})
  }

  const validation = IssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})

  const issueExists = await prisma.issue.findUnique({where: {title}})
  if (issueExists)
    return NextResponse.json({message: 'Issue already exists'}, {status: 400})

  const issue = await prisma.issue.create({
    data: {
      id,
      title,
      description,
      status,
    },
  })

  return NextResponse.json(issue, {status: 201})
}
