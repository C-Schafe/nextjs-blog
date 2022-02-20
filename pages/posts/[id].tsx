import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from 'next/link';
import { stringify } from "querystring";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { getPostsNameList, getPostContent } from '../../lib/posts';
import { Post } from "../../src/entity/Post";

type Props = {
  post: Post
}

const PostPage: NextPage<Props> = (props) => {
  const { post } = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <hr />
      <article>{post.content}</article>
      <hr />
      <Link href={'/'}>
        <a>Homepage</a>
      </Link>
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