import {Button, Flex} from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

export default function IssueActions() {
  return (
    <Flex justify="between" data-cy="issue-actions-comp">
      <IssueStatusFilter />
      <Button>
        <Link data-cy="new-issue" href="/issues/new">
          New Issue
        </Link>
      </Button>
    </Flex>
  )
}
