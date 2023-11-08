import {Box} from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingNewIssuePage() {
  return (
    <Box className="max-w-xl" data-cy="loading-new-issue-page-comp">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  )
}
