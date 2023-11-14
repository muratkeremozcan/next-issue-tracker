import GoogleProvider from 'next-auth/providers/google'

// export the options so we can use them
// to access the session at the server, at Home component
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
}
