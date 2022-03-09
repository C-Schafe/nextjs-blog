// import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import 'github-markdown-css';
import { ErrorBoundary } from '../pages/error/errorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>我的博客 - JMY</title>
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}

export default MyApp
