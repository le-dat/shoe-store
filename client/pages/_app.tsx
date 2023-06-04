import type { AppProps } from "next/app"
import NextNProgress from "nextjs-progressbar"

import { DefaultLayout } from "@/layout"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <NextNProgress color="#d67755" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
