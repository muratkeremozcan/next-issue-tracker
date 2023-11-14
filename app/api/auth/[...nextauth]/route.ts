import NextAuth from 'next-auth'
import {authOptions} from './authOptions'

const handler = NextAuth(authOptions)

// any GET or POST will get handled by the NextAuth handler
export {handler as GET, handler as POST}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
