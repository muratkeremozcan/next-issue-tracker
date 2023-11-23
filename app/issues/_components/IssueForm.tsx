'use client'

import {Button, TextField, Callout, Text} from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import type {Issue} from '@/app/api/issues/schema'
import {IssueSchema} from '@/app/api/issues/schema'
import {ErrorMessage, Spinner} from '@/app/components'
import {curry} from 'ramda'
import SimpleMDE from 'react-simplemde-editor'

type IssueFormProps = {
  readonly issue?: Issue
}

export default function IssueForm({issue}: IssueFormProps) {
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

  // currying
  // submitIssue takes issue as an argument and returns another function.
  // This inner function is the actual asynchronous function that performs the API call.
  // When passing submitIssue to handleSubmit, it's invoked with issue as its argument.
  // This refactor turns submitIssue into a higher-order function,
  // where it takes an argument and returns a new function that is used in the form submission.
  // This approach makes the function more testable and predictable, as it doesn't depend on the external state directly.

  // const submitIssue = (issue: Issue | undefined) => async (data: Issue) => {
  //   try {
  //     setIsSubmitting(true)
  //     if (issue) await axios.put(`/api/issues/${issue.id}`, data)
  //     else await axios.post('/api/issues', data)
  //     return router.push('/issues')
  //   } catch (error) {
  //     setIsSubmitting(false)
  //     console.error(error)
  //     setError('An unexpected error occurred. Please try again later.')
  //   }
  // }

  // currying with ramda
  const submitIssue = curry(async (issue: Issue | undefined, data: Issue) => {
    try {
      setIsSubmitting(true)
      if (issue) await axios.put(`/api/issues/${issue.id}`, data)
      else await axios.post('/api/issues', data)

      router.push('/issues/list')

      // client/router cache workaround to see issues we added / updated immediately (not wait 30 seconds):
      // we force the router to refetch a page
      return router.refresh()
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
      setError('An unexpected error occurred. Please try again later.')
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root data-cy="submit-error" color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(submitIssue(issue))}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
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
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({field}) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button data-cy="submit-new-issue">
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
