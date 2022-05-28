import React, { useCallback } from 'react'
import Link from 'next/link';

export default function Home() {
  const forbidSignUp = useCallback(() => {
    alert('注册暂不可用');
  }, []);
  return (
    <div >
      <main className='homepage'>
        <div className='intro'>
            <div className='avatar'>
              <p className='name'>LouisChiang / <span>Blog</span></p>
              <img src={require('../assets/image/sheep_line.jpg')}/>
            </div>
            <p className='slogan en'>Thinking and recording.</p>
            <p className='slogan ch'>写点东西的地方。</p>
            <Link href="/posts">
              <a><u>博客列表</u></a>
            </Link>
        </div>
        <div className='authorization'>
          <a href="#" onClick={forbidSignUp}>注册 </a>
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
        .intro {
          display: flex;
          flex-direction: column;
          height: 66%;
          width: 80vw;
          margin: 0 auto;
        }
        .intro .slogan {
          font-size: 2vw;
          color: #757C85;
          margin-top: 0;
        }
        .intro a {
          color: #757C85;
        }
        .avatar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .avatar img {
          height: 16vw;
          border-radius: 3vw;
        }
        .avatar .name{
          font-size: 5vw;
          font-weight: 300;
        }
        .avatar .name span {
          font-weight: bold;
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
