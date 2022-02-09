import { useEffect, useState } from 'react';
import axios from 'axios';

type Post = {
  title: string;
  date: string;
  content: string;
}

export const usePosts = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      axios.get('/api/posts').then((response) => {
        setPostsList(response.data);
        setIsLoading(false);
      });
    }, 500)
  }, []);
  return {
    postsList,
    isLoading,
    setIsLoading
  }
}
