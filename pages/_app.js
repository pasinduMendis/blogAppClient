import { SessionProvider } from 'next-auth/react';
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
        <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </SessionProvider>
  )
}

export default MyApp
