import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'

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
      </Head>
      <SessionProvider session={session}>
        <main className="body-bold flex flex-col">
          <Component {...pageProps} />
          <Analytics />
        </main>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
