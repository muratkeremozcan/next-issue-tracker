import {Select} from '@radix-ui/themes'

export default function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign" data-cy="assign" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">mosh</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
