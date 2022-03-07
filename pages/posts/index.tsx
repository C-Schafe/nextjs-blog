import React, { useEffect, useState }  from "react";
import Link from 'next/link';
import { usePosts } from '../../hooks/testUsePosts';
import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from "../../src/entity/Post";
import { take } from "lodash";
import { usePager } from '../../hooks/usePager';
const queryString = require('query-string');

type Props = {
  postsList: Post[];
  allCount: number;
  currentPage: string;
  totalPage: number;
}

const PostsList:NextPage<Props> = (props) => {
  const { postsList, allCount, currentPage, totalPage } = props;
  const { pager } = usePager({
    allCount,
    currentPage: parseInt(currentPage),
    totalPage,
  });
  return (
    <div className="post-list">
      <h1>文章列表</h1>
      {postsList.length > 0 && postsList.map((post) => {
        return (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a><div className="post-link">{post.title}</div></a>
          </Link>
        );
      })}
      <br />
      {/* {`共 ${allCount} 篇博客，当前为第 ${currentPage} 页`} */}
      {pager}
      <style jsx>{`
        .post-list {
          width: 100%;
          height: 100vh;
          padding: 15px 20px;
        }
        .post-list a:hover {
          color: #bbb;
        }
        .post-link {
          margin: 10px 0;
        }
      `}</style>
    </div>
  )
}

export default PostsList;

export const getServerSideProps:GetServerSideProps = async(context) => {
  const perPageCount = 10;
  const index = context.req.url.indexOf('?');
  let page = queryString.parse(context.req.url.substring(index)).page || 1;
  if(page <= 0) {
    page = 1;
  }
  const connection = await getDatabaseConnection();
  const postsListResult = await connection.manager.findAndCount(Post, {
    skip: (page - 1) * perPageCount,
    take: perPageCount,
  });
  const allPostsNumber = postsListResult[1];
  const totalPage = Math.ceil(allPostsNumber / perPageCount);
  return {
    props: {
      postsList: JSON.parse(JSON.stringify(postsListResult[0])),
      allCount: allPostsNumber,
      currentPage: page,
      totalPage
    }
  }
}
