// import React from 'react';
import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>This the title for all pages.</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
