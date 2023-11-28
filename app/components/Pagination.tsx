'use client'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import {Button, Flex, Text} from '@radix-ui/themes'
import {useRouter, useSearchParams} from 'next/navigation'

type PaginationProps = {
  readonly itemCount: number
  readonly pageSize: number
  readonly currentPage: number
}

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())

    return router.push('?' + params.toString())
  }

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null

  return (
    <Flex align="center" gap="2">
      <Text data-cy="text" size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon data-cy="dbl-back-btn" />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon data-cy="back-btn" />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon data-cy="forward-btn" />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon data-cy="dbl-forward-btn" />
      </Button>
    </Flex>
  )
}
