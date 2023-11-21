import {NextResponse, type NextRequest} from 'next/server'
import {patchIssueSchema, type Issue} from '../schema'
import {prisma} from '@/prisma/client'

type Props = {
  params: {
    id: string
  }
}

const issueExists = (id: string) =>
  prisma.issue.findUnique({where: {id: Number(id)}})

const userExists = (id: string | undefined) =>
  prisma.user.findUnique({where: {id}})

export async function GET(request: NextRequest, {params: {id}}: Props) {
  const issue = (await prisma.issue.findUnique({
    where: {id: Number(id)},
  })) as Issue | null // using type assertion because we prefer zod definition and we are limited with sqlite

  if (!issue) return NextResponse.json({message: 'Issue does not exist'})

  return NextResponse.json(issue, {status: 200})
}

export async function PUT(request: NextRequest, {params: {id}}: Props) {
  const body: Issue = await request.json()
  const {title, description, status, assignedToUserId} = body

  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})

  if (assignedToUserId && !(await userExists(assignedToUserId)))
    return NextResponse.json({message: 'User does not exist'}, {status: 400})

  if (!(await issueExists(id)))
    return NextResponse.json(
      {error: 'The issue does not exist.'},
      {status: 404},
    )

  const updatedIssue = await prisma.issue.update({
    where: {id: Number(id)},
    data: {title, description, status, assignedToUserId},
  })

  return NextResponse.json(updatedIssue, {status: 200})
}

export async function DELETE(request: NextRequest, {params: {id}}: Props) {
  if (!(await issueExists(id)))
    return NextResponse.json(
      {error: 'The issue does not exist.'},
      {status: 404},
    )

  const deletedIssue = await prisma.issue.delete({
    where: {id: Number(id)},
  })

  return NextResponse.json(deletedIssue)
}
