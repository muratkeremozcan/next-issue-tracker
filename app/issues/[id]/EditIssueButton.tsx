import {Pencil2Icon} from '@radix-ui/react-icons'
import {Button} from '@radix-ui/themes'
import Link from 'next/link'

type EditIssueButton = {
  readonly issueId: number
}

export default function EditIssueButton({issueId}: EditIssueButton) {
  return (
    <Button data-cy="edit-issue-comp">
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  )
}
