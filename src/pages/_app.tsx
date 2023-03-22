import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

import { api } from '../utils/api'
import '../styles/globals.css'
import { PrimaryNavBar } from '../components'
import ToolTip from '../components/Buttons/ToolTipButton'
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
        <PrimaryNavBar />
        <ToolTip type="sector" />
        <main className="flex flex-col font-klima text-lg">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
