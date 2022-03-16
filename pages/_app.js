import ContextProvider from "../components/context";
import Layout from "../components/layouts/baseLayout";
import "../styles/globals.css";
import Navbar from "../components/layouts/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
