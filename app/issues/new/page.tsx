'use client'

import dynamic from 'next/dynamic'
import {Button, TextField} from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios'
import {useRouter} from 'next/navigation'
// Dynamic import `SimpleMDE` with SSR disabled, because it gives terminal errors with webpack, despite 'use client'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})
// import 'easymde/dist/easymde.min.css' // breaks the component test, so moved it up to layout

type IssueForm = {
  title: string
  description: string
}

export default function NewIssuePage() {
  const router = useRouter()
  const {register, control, handleSubmit} = useForm<IssueForm>()
  // console.log(register('title')) // gives an object with 4 fields; name, onChange, onBlur, ref

  const submitIssue = async (data: IssueForm) => {
    await axios.post('/api/issues', data)
    return router.push('/issues')
  }

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(submitIssue)}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      {/* we need the Controller component because we cannot add props to SimpleMDE */}
      {/* it has an amazing api... seriously, wth is going on here? */}
      <Controller
        name="description"
        control={control}
        render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button data-cy="submit-new-issue">Submit New Issue</Button>
    </form>
  )
}
