import React, { useEffect, useState }  from "react";
import Link from 'next/link';
import { usePosts } from '../../hooks/testUsePosts';
import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from "../../src/entity/Post";
import { take } from "lodash";
const queryString = require('query-string');

type Props = {
  postsList: Post[];
  allCount: number;
  currentPage: string;
  totalPage: string;
}

const PostsList:NextPage<Props> = (props) => {
  const { postsList, allCount, currentPage, totalPage } = props;
  return (
    <div>
      <h1>this is posts list:</h1>
      {postsList.length > 0 && postsList.map((post) => {
        return (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a><div>{post.title}</div></a>
          </Link>
        );
      })}
      <br />
      {`共 ${allCount} 篇博客，当前为第 ${currentPage} 页`} |
      <Link href={`/posts?page=${parseInt(currentPage) - 1}`}>
        <a>上一页</a>
      </Link>
      [{currentPage}/{totalPage}]
      <Link href={`/posts?page=${parseInt(currentPage) + 1}`}>
        <a>下一页</a>
      </Link>
    </div>
  )
}

export default PostsList;

export const getServerSideProps:GetServerSideProps = async(context) => {
  const perPageCount = 3;
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
