import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { KeyProvider } from '../components/context/keyProvider'
import Layout from '../components/layout';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KeyProvider>
      <ToastContainer position='bottom-center' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KeyProvider>
  );
}
