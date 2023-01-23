import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { KeyProvider } from '../components/context/keyProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KeyProvider>
      <Component {...pageProps} />
    </KeyProvider>
  );
}
