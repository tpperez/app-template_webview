import { Roboto } from 'next/font/google'
import { headers } from 'next/headers'

import type { Metadata } from 'next'

import FooterContainer from '@/app/components/structure/footer'
import HeaderContainer from '@/app/components/structure/header'
import ButtonCloseWebview from '@/app/components/ui/button-close-webview'
import { LANGUAGE, SITE_NAME } from '@/app/constants/config'
import { HttpProvider } from '@/app/services/http/providers'
import ILayout from '@/app/types/layout'
import NativeBridgeProvider from '@/app/utils/native/providers'

import '@/app/styles/globals.css'

// import isDev from '@/app/utils/is-dev'
// import { NativeTokenGate } from '@/app/utils/native/token'
// import { DevTokenSetter } from '@/app/utils/native/token/dev-token-setter/dev-token-setter'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME}`,
  },
  description:
    'An example of a text for description meta tag for the application.',
}

const LayoutRoot = async ({ children }: ILayout) => {
  const headersList = headers()
  const nonce = (await headersList).get('x-nonce') || undefined

  return (
    <html lang={LANGUAGE}>
      <head>
        {nonce && (
          <meta
            name='csp-nonce'
            content={nonce}
          />
        )}
      </head>
      <body
        className={`${roboto.variable} font-roboto antialiased`}
        suppressHydrationWarning={true}
      >
        <NativeBridgeProvider />
        {/* <NativeTokenGate> */}
        <HttpProvider>
          <HeaderContainer />
          <main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {children}
          </main>
          <FooterContainer />
          <ButtonCloseWebview />
        </HttpProvider>
        {/* </NativeTokenGate> */}
        {/* {isDev() && <DevTokenSetter />} */}
      </body>
    </html>
  )
}

export default LayoutRoot
