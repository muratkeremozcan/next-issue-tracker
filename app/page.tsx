import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import {prisma} from '@/prisma/client'
import type {Status} from './issues/types'
import {Flex} from '@radix-ui/themes'

const getIssueCount = (status: Status) => prisma.issue.count({where: {status}})

export default async function Home() {
  const open = await getIssueCount('OPEN')
  const inProgress = await getIssueCount('IN_PROGRESS')
  const closed = await getIssueCount('DONE')

  return (
    <Flex gap="4" direction="column">
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </Flex>
  )
}
