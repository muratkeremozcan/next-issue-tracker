import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import {prisma} from '@/prisma/client'
import type {Status} from './issues/types'
import {Flex, Grid} from '@radix-ui/themes'
import IssueChart from './IssueChart'

const getIssueCount = (status: Status) => prisma.issue.count({where: {status}})

export default async function Home() {
  const open = await getIssueCount('OPEN')
  const inProgress = await getIssueCount('IN_PROGRESS')
  const closed = await getIssueCount('DONE')
  const props = {open, inProgress, closed}

  return (
    <Grid columns={{initial: '1', md: '2'}} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...props} />
        <IssueChart {...props} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
