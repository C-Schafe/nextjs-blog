import React, { useEffect, useState }  from "react";
import axios from 'axios';
import Link from 'next/link';
import { getPostsNameList, getPostContent } from '../../lib/posts';

import { usePosts } from '../../hooks/testUsePosts';
import { GetStaticProps, NextPage } from "next";

type Post = {
  title: string;
  date: string;
  content: string;
}

type Props = {
  postsNameList: string[];
}

const PostsList:NextPage<Props> = (props) => {
  const postsNameList = props.postsNameList;
  return (
    <div>
      <h1>this is posts list</h1>
      {postsNameList && postsNameList.map((postName) => {
        return (
          <Link key={postName} href={`/posts/${postName.replace(/.md$/, '')}`}>
            <a><div>{postName.replace(/.md$/, '')}</div></a>
          </Link>
        );
      })}
    </div>
  )
}

export default PostsList;

export const getStaticProps:GetStaticProps = (staticContext) => {
  const postsNameList = getPostsNameList();
  return {
    props: {
      postsNameList,
    }
  }
}
