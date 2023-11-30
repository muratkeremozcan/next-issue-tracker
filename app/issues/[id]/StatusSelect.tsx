'use client'
import {statusOptions, type Issue} from '@/app/api/issues/schema'
import {Select} from '@radix-ui/themes'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import type {Status} from '../types'

export default function StatusSelect({issue}: {issue: Issue}) {
  const router = useRouter()
  const updateStatus = async (newStatus: Status) => {
    try {
      await axios.put(`/api/issues/${issue.id}`, {...issue, status: newStatus})
      toast.success('Status updated')
      return router.refresh()
    } catch (error) {
      toast.error(`Changes could not be saved. ${error}`)
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.status || 'OPEN'}
        onValueChange={updateStatus}
      >
        <Select.Trigger placeholder="Status" data-cy="status-select" />
        <Select.Content>
          {statusOptions.map(status => (
            <Select.Item
              key={status}
              value={status}
              data-cy={`status-${status}`}
            >
              {status}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Toaster />
      <Toaster />
    </>
  )
}
