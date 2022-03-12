import React from 'react'
import Link from 'next/link';

export default function Home() {
  return (
    <div >
      <main className='homepage'>
        <img src={require('../assets/image/sheep_baw.png')}/>
        <h1>JMY 的个人博客</h1>
        <p>我在青青草原吃草</p>
        <p>我在青青草原奔跑</p>
        <p>我在青青草原晒太阳</p>
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
        .homepage {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .authorization {
          position: fixed;
          right: 30px;
          top: 15px;
        }
      `}</style>
    </div>
  )
}
