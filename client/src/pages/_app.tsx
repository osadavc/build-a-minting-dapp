import type { AppProps } from "next/app";
import Head from "next/head";

import { Provider, createClient } from "wagmi";

import "../styles/globals.css";

const client = createClient({
  autoConnect: true,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider client={client}>
      <Head>
        <title>Next Starter</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
