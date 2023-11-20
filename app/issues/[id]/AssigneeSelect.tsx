'use client'
import type {User} from '@prisma/client'
import {Select} from '@radix-ui/themes'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css' // breaks next.js + cyct

export default function AssigneeSelect() {
  // note: useEffect + useState into react-query refactor
  // const [users, setUsers] = useState<User[]>([])
  // useEffect(() => {
  //   axios.get<User[]>('/api/users').then(({data}) => setUsers(data))
  // }, [])

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

  if (isLoading) return <Skeleton />
  if (error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" data-cy="assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(({id, name}) => (
            <Select.Item key={id} value={id} data-cy={`user-${name}`}>
              {name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
