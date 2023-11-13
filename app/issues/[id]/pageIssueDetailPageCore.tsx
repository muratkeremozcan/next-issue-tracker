/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type {Issue} from '@/app/api/issues/schema'
import {Box, Flex, Grid} from '@radix-ui/themes'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

type IssueDetailPageCoreProps = {
  readonly issue: Issue
}

export default function IssueDetailPageCore({issue}: IssueDetailPageCoreProps) {
  return (
    <Grid
      columns={{initial: '1', sm: '5'}}
      gap="5"
      data-cy="issue-detail-page-core-comp"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="col-span-1">
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issue.id!} />
          <DeleteIssueButton issueId={issue.id!} />
        </Flex>
      </Box>
    </Grid>
  )
}
