// when we refresh the page, we don't see the loading skeleton because it is loaded statically (default)
// we only see the loading skeleton upon a new issue
// to make refresh work like adding a new issue, seeing the skeleton (better loading experience)
// we have to use dynamic import instead of the static import
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

export default function NewIssuePage() {
  return <IssueForm />
}
