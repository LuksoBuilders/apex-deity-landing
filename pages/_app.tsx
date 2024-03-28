import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../components/theme";
import Head from "next/head";

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

      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
