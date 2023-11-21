'use client'
import type {Issue} from '@/app/api/issues/schema'
import type {User} from '@prisma/client'
import {Select} from '@radix-ui/themes'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css' // breaks next.js + cyct

const useUsers = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return axios.get<User[]>('/api/users').then(({data}) => data)
    },
    staleTime: 60 * 1000, // if 60 secs passed, don't use cache
    retry: 3, // retry 3 times
  })

  return {users, error, isLoading}
}

export default function AssigneeSelect({issue}: {issue: Issue}) {
  // note: useEffect + useState into react-query refactor
  // const [users, setUsers] = useState<User[]>([])
  // useEffect(() => {
  //   axios.get<User[]>('/api/users').then(({data}) => setUsers(data))
  // }, [])

  const {users, error, isLoading} = useUsers()

  const assignIssue = async (userId: string) => {
    const payload = {
      assignedToUserId: userId === 'unassigned' ? null : userId,
    }
    try {
      await axios.put(`/api/issues/${issue.id}`, payload)
      toast.success('Assigned to user')
    } catch (error) {
      toast.error(`Changes could not be saved. ${error}`)
    }
  }

  if (isLoading) return <Skeleton />
  if (error) return null

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign" data-cy="assign" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map(({id, name}) => (
              <Select.Item key={id} value={id} data-cy={`user-${name}`}>
                {name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}
