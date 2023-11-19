## Getting Started

First, run the development server:

```bash
npm run dev

npm run cy:open-local

## when you have a dev deployment
npm run cy:open-dev

## CT
npm run cy:open-ct
```

> It still doesn't look like we can make next-auth work well. This middleware
> will break the tests:
>
> ```ts
> // ./middleware.ts
> import middleware from 'next-auth/middleware'
> export default middleware
> short version
> export {default} from 'next-auth/middleware'
>
> export const config = {
>   matcher: ['/issues/new', '/issues/edit/:id+'],
> }
>
> ```
