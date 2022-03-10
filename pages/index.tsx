import React from 'react'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
// asset
import imageAsset from '../assets/image/sheep_baw.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src={imageAsset.src} alt='homepage-logo' height={200} width={190}></Image>
        <h1>JMY 的个人博客</h1>
        <p>我在青青草原吃草</p>
        <p>我在青青草原奔跑</p>
        <Link href="/posts">
          <a><u>博客列表</u></a>
        </Link>
        <div className='authorization'>
          <Link href="/signUp">
            <a>注册 </a>
          </Link>
          <Link href="/signIn">
            <a>登录</a>
          </Link>
        </div>
      </main>
      <style jsx>{`
        .authorization {
          position: fixed;
          right: 30px;
          top: 15px;
        }
      `}</style>
    </div>
  )
}
