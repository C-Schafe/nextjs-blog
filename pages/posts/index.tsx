import React, { useEffect, useState }  from "react";
import Link from 'next/link';

import { usePosts } from '../../hooks/testUsePosts';
import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from "../../src/entity/Post";


type Props = {
  postsList: Post[];
}

const PostsList:NextPage<Props> = (props) => {
  const { postsList } = props;
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
    </div>
  )
}

export default PostsList;

export const getServerSideProps:GetServerSideProps = async(context) => {
  const connection = await getDatabaseConnection();
  const postsList = await connection.manager.find(Post);
  return {
    props: {
      postsList: JSON.parse(JSON.stringify(postsList)),
    }
  }
}
