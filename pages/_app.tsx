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
          content="ArtisanAlly is the first step for the creative projects. It will help you to find a community that cares for what you're creating, and show it by funding you."
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
