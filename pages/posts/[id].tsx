import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from 'next/link';
import { stringify } from "querystring";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { getPostsNameList, getPostContent } from '../../lib/posts';
import { Post } from "../../src/entity/Post";
import { marked } from 'marked';

type Props = {
  post: Post
}

const PostPage: NextPage<Props> = (props) => {
  const { post } = props;
  const html = marked.parse(post.content);
  return (
    <div className={`post-detail markdown-body`}>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html: html}}/>
      <style jsx>{`
        .post-detail {
          padding: 10px 20px 50px;
          width: 80%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

export default PostPage;

export const getServerSideProps:GetServerSideProps = async(context) => {
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, context.params.id as string);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
}