'use client'

import dynamic from 'next/dynamic'
import {Button, TextField} from '@radix-ui/themes'
// Dynamic import `SimpleMDE` with SSR disabled, because it gives terminal errors with webpack, despite 'use client'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})
// import 'easymde/dist/easymde.min.css' // breaks the component test, so moved it up to layout

export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  )
}
