import GoogleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from '@/prisma/client'

// export the options so we can use them
// to access the session at the server, at Home component
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}
