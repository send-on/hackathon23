import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '@/context/AppProvider'
import Header from '@/components/Header'
import {Theme} from '@twilio-paste/core/theme';

export default function App({ 
  Component,
  pageProps: { ...pageProps },
}: AppProps ) {
  return (
    <>
      <AppProvider>
        <Theme.Provider theme="default">
          <Header />
          <Component {...pageProps} />
        </Theme.Provider>
      </AppProvider>
    </>
  )
}