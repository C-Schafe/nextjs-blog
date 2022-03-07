import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from 'next/link';
import { stringify } from "querystring";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { getPostsNameList, getPostContent } from '../../lib/posts';
import { Post } from "../../src/entity/Post";
import { marked } from 'marked';
import { withSession } from "../../lib/withSession";
import { User } from "../../src/entity/User";

type Props = {
  post: Post;
  currentUser: User;
  id: string;
}

const PostPage: NextPage<Props> = (props) => {
  const { post, currentUser, id } = props;
  const html = marked.parse(post.content);
  console.log('dfdf');
  console.log(id)
  return (
    <div className={`post-detail markdown-body`}>
      <h1>{post.title}</h1>
      {currentUser && <Link href={'/posts/[id]/edit'} as={`/posts/${id}/edit`}>
        <a><span>编辑</span></a>
      </Link>}
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

export const getServerSideProps:GetServerSideProps = withSession(async(context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, context.params.id as string);
  //@ts-ignore
  const user = context.req.session.get('user') || null;
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      currentUser: user,
      id: context.params.id,
    }
  }
})