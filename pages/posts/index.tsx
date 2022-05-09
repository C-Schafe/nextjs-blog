import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { usePosts } from '../../hooks/testUsePosts';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from "../../src/entity/Post";
import { take } from "lodash";
import { usePager } from '../../hooks/usePager';
import { withSession } from "../../lib/withSession";
import { User } from "../../src/entity/User";
import { createConnection } from "typeorm";
const queryString = require('query-string');

type Props = {
  postsList: Post[];
  allCount: number;
  currentPage: string;
  totalPage: number;
  currentUser: User;
}

const PostsList: NextPage<Props> = (props) => {
  const { postsList, allCount, currentPage, totalPage, currentUser } = props;
  const { pager } = usePager({
    allCount,
    currentPage: parseInt(currentPage),
    totalPage,
  });
  return (
    <div className="post-list">
      <div className="header">
        <h1>文章列表</h1>
        {currentUser && <Link href={'/newPost'}>
          <a><span className="add-post">新增博客</span></a>
        </Link>}
      </div>
      {postsList.length > 0 && postsList.map((post) => {
        return (
          <div className="post-item">
            <h2>
              <Link key={post.id} href={'/posts/[id]'} as={`/posts/${post.id}`}>
                <a><div className="post-link">{post.title}</div></a>
              </Link>
            </h2>
            <p className="intro">{post.content.substring(0, 100)}</p>
            <Link key={post.id} href={'/posts/[id]'} as={`/posts/${post.id}`}>
              <a className="more">阅读更多</a>
            </Link>
          </div>
        );
      })}
      <br />
      {pager}
      <br />
      <Link href="/">
        <a>返回首页</a>
      </Link>
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .post-list {
          width: 800px;
          height: 100vh;
          padding: 15px 20px;
          margin: 0 auto;
        }
        .post-list a {
          transition: 0.1s;
        }
        .post-list a:hover {
          color: #898888;
        }
        .post-list .post-item {
          border-bottom: 1px solid grey;
          padding-bottom: 1.5em;
          color: #39454e;
        }
        .post-list .post-item .intro {
          font-size: 16px;
          margin-bottom: 1em;
        }
        .post-list .post-item .more {
          display: inline-block;
          padding-bottom: 0.1em;
          border-bottom: 1px solid transparent;
        }
        .post-list .post-item .more:hover {
          color: #898888;
          border-bottom: 1px solid #bbb;
        }
        .post-link {
          margin: 10px 0;
        }
        .add-post {
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

export default PostsList;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const perPageCount = 10;
  const index = context.req.url.indexOf('?');
  let page = queryString.parse(context.req.url.substring(index)).page || 1;
  if (page <= 0) {
    page = 1;
  }
  const connection = await getDatabaseConnection();
  const postsListResult = await connection.manager.findAndCount(Post, {
    skip: (page - 1) * perPageCount,
    take: perPageCount,
  });
  const allPostsNumber = postsListResult[1];
  const totalPage = Math.ceil(allPostsNumber / perPageCount);
  //@ts-ignore
  const user = context.req.session.get('user') || null;
  return {
    props: {
      postsList: JSON.parse(JSON.stringify(postsListResult[0])),
      allCount: allPostsNumber,
      currentPage: page,
      totalPage,
      currentUser: user,
    }
  }
})
