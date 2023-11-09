/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type {Issue} from '@/app/api/issues/schema'
import {Box, Grid} from '@radix-ui/themes'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

type IssueDetailPageCoreProps = {
  readonly issue: Issue
}

export default function IssueDetailPageCore({issue}: IssueDetailPageCoreProps) {
  return (
    <Grid
      columns={{initial: '1', md: '2'}}
      gap="5"
      data-cy="issue-detail-page-core-comp"
    >
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id!} />
      </Box>
    </Grid>
  )
}
