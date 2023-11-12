import {Box} from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl" data-cy="loading-new-issue-page-comp">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  )
}
