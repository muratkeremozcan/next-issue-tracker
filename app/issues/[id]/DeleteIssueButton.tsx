'use client'

import {AlertDialog, Button, Flex} from '@radix-ui/themes'
import {Spinner} from '@/app/components'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import axios from 'axios'

type DeleteIssueButton = {
  readonly issueId: number
}

export default function DeleteIssueButton({issueId}: DeleteIssueButton) {
  const [error, setError] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const deleteIssue = async (issueId: number) => {
    try {
      setIsDeleting(true)
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')

      // client/router cache workaround to see issues we added / updated immediately (not wait 30 seconds):
      // we force the router to refetch a page
      return router.refresh()
    } catch (error) {
      setIsDeleting(false)
      console.error(error)
      setError(true)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" data-cy="delete-issue-comp" disabled={isDeleting}>
            {isDeleting && <Spinner />}Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content data-cy="alert-modal">
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue?
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" data-cy="cancel">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="soft"
                color="red"
                data-cy="delete-issue-confirm"
                disabled={isDeleting}
                onClick={() => deleteIssue(issueId)}
              >
                {isDeleting && <Spinner />} Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content data-cy="error-modal">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            An unexpected error occurred. Please try again later.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            data-cy="ok-button"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
