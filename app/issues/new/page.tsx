'use client'

import dynamic from 'next/dynamic'
import {Button, TextField, Callout, Text} from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import type {Issue} from '@/app/api/issues/schema'
import {IssueSchema} from '@/app/api/issues/schema'
import {ErrorMessage, Spinner} from '@/app/components'
// Dynamic import `SimpleMDE` with SSR disabled, because it gives terminal errors with webpack, despite 'use client'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})
// import 'easymde/dist/easymde.min.css' // breaks the component test, so moved it up to layout

export default function NewIssuePage() {
  const router = useRouter()
  // (1) setup the backend schema and infer the type from it: app/api/issues/schema.ts
  // (2) grab the appropriate resolver from hookform/resolvers
  // (3) use the resolver with the schema as an argument, utilize the type throughout the form component
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Issue>({
    resolver: zodResolver(IssueSchema),
  })
  // console.log(register('title')) // gives an object with 4 fields; name, onChange, onBlur, ref

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitIssue = async (data: Issue) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/issues', data)
      return router.push('/issues')
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
      setError('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root data-cy="submit-error" color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(submitIssue)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p" data-cy="form-title-error">
            {errors.title.message}
          </Text>
        )}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* we need the Controller component because we cannot add props to SimpleMDE */}
        {/* it has an amazing api... seriously, wth is going on here? */}
        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button data-cy="submit-new-issue">
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
