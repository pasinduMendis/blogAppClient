import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'blogApp',
      credentials: {
        email: {
          label: 'email',
          placeholder: 'Your email here',
        },
        password: {
          label: 'password',
          placeholder: 'Your password here',
        },
      },
      async authorize(credentials, req) {

        const payload = {
          email: credentials.email,
          password: credentials.password,
        }

        const url = process.env.BASE_URL + 'auth/signIn'
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        })

        const user = await res.json()
        if (res.status !== 200) {
          console.log('Throwing error ', user)
          throw new Error(user.message)
        }
        if (res.status === 200 && user) {
          return user
        }
        
        return null
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {

        return {
          ...token,
          ...user.userData
        }
      }
      return token
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.accessTokenExpires = token.accessTokenExpires
      session.user.id = token.userId
      session.user.name = token.name
      return session
    },
  },
})
