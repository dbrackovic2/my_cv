import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProviderWrapper } from '@/components/apollo-provider-wrapper'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <ApolloProviderWrapper>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProviderWrapper>
  )
}
