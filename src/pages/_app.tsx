import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

import { api } from '../utils/api'
import '../styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>TORIIS</title>
        <meta
          name="description"
          content="Transparent and Open Resource for Institutional Investments"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <main className="flex flex-col font-klima text-lg">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
