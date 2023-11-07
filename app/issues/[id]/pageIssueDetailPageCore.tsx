import type {Issue} from '@/app/api/issues/schema'

type IssueDetailPageCoreProps = {
  readonly issue: Issue
}

export default function IssueDetailPageCore({issue}: IssueDetailPageCoreProps) {
  return (
    <div data-cy="issue-detail-page-core-comp">
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt?.toDateString()}</p>
    </div>
  )
}
