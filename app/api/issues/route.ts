import {NextResponse, type NextRequest} from 'next/server'
import {IssueSchema, type Issue} from './schema'
import {prisma} from '@/prisma/client'

// need to have an argument (although not used) to prevent NextJs caching the result
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany()

  return NextResponse.json(issues, {status: 200})
}

// route.ts
export async function POST(request: NextRequest) {
  const body = await request.json()

  // Validate and apply defaults using Zod
  const validation = IssueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {status: 400})
  }

  // After successful validation, 'status' will default to 'OPEN' if not provided
  const {title, description, status} = validation.data

  const issueExists = await prisma.issue.findUnique({where: {title}})
  if (issueExists) {
    return NextResponse.json({message: 'Issue already exists'}, {status: 400})
  }

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      status, // This will use the value from validation.data which defaults to 'OPEN'
    },
  })

  return NextResponse.json(issue, {status: 201})
}
