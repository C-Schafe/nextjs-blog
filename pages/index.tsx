import React from 'react'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
// asset
import imageAsset from '../assets/image/sheep_baw.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src={imageAsset.src} height={300}/>
        <h1>JMY 的个人博客</h1>
        <p>我在青青草原吃草</p>
        <Link href="/posts">
          <a><u>博客列表</u></a>
        </Link>
      </main>
    </div>
  )
}
