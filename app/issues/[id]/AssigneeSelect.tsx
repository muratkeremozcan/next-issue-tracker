'use client'
import type {User} from '@prisma/client'
import {Select} from '@radix-ui/themes'
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios.get<User[]>('/api/users').then(({data}) => setUsers(data))
  }, [])

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" data-cy="assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map(({id, name}) => (
            <Select.Item key={id} value={id} data-cy={`user-${name}`}>
              {name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
