// import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import 'github-markdown-css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>我的博客/louischiang</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
