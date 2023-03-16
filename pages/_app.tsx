import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { KeyProvider } from "../components/context/keyProvider";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <KeyProvider>
      <Toaster position="bottom-center" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KeyProvider>
  );
}
