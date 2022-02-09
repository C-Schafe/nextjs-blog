import React, { useEffect, useState }  from "react";
import axios from 'axios';

import { usePosts } from '../../hooks/testUsePosts';

type Post = {
  title: string;
  date: string;
  content: string;
}

export default function PostsList() {
  const { isLoading, postsList} = usePosts();
  return (
    <div>
      <h1>this is posts list</h1>
      <div>{isLoading && 'Loading...'}</div>
      {!isLoading && postsList && postsList.map((post:Post) => {
        return (
          <div key={post.date}>{post.title}</div>
        );
      })}
    </div>
  )
}