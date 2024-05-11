import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../components/theme";
import Head from "next/head";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ExtentionProvider } from "../components/hooks/useExtension";
import { client } from "../components/client";
import { ApolloProvider } from "@apollo/client";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    lukso?: MetaMaskInpageProvider;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <title>Apex Deities</title>
        <meta
          name="description"
          content="Apex Deities is a collection of 100 unique hand drawn Deities that have godly power over the ArtisanAlly platform."
        />{" "}
      </Head>

      <ApolloProvider client={client}>
        <ExtentionProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ExtentionProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
