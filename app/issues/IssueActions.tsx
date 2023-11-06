import React from 'react'
import {Button} from '@radix-ui/themes'
import Link from 'next/link'

export default function IssueActions() {
  return (
    <div className="mb-5" data-cy="issue-actions-comp">
      <Button>
        <Link data-cy="new-issue" href="/issues/new">
          New Issue
        </Link>
      </Button>
    </div>
  )
}
