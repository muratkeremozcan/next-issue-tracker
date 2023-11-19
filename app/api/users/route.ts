import {NextResponse, type NextRequest} from 'next/server'
import {prisma} from '@/prisma/client'

// need to have an argument (although not used) to prevent NextJs caching the result
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({orderBy: {name: 'asc'}})

  return NextResponse.json(users, {status: 200})
}
