import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from 'next/link';
import { stringify } from "querystring";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { getPostsNameList, getPostContent } from '../../lib/posts';
import { Post } from "../../src/entity/Post";
import marked from 'marked';
import { withSession } from "../../lib/withSession";
import { User } from "../../src/entity/User";
import { useCallback } from "react";
import axios from "axios";

type Props = {
  post: Post;
  currentUser: User;
  id: string;
}

const PostPage: NextPage<Props> = (props) => {
  const { post, currentUser, id } = props;
  const html = marked.parse(post.content);
  const onRemove = useCallback(() => {
    console.log('delete');
    axios.delete(`/api/posts/${id}`).then(
      () => {
        alert('删除成功!');
        location.href = '/posts';
      },
      () => {
        alert('服务器错误，删除失败')
      }
    )
  }, [id]);
  return (
    <div className={`post-detail markdown-body`}>
      <h1>{post.title}</h1>
      <div>
        <Link href="/posts">
          <a>返回博客列表 </a>
        </Link>
        {currentUser && <div className="actions">
        <Link href={'/posts/[id]/edit'} as={`/posts/${id}/edit`}>
          <a><span>编辑</span></a>
        </Link>
        <a><span className="detele-button" onClick={onRemove}>删除</span></a>
      </div>}
      </div>
      <article dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx>{`
        .post-detail {
          padding: 10px 20px 50px;
          width: 80%;
          margin: 0 auto;
        }
        .actions {
          display: flex;
          justify-content: space-between;
          width: 5em;
          margin-bottom: 20px;
        }
        .delete-button {
          color: #F88072;
        }
        .delete-button:hover {
          color: #F88072;
        }
      `}</style>
    </div>
  )
}

export default PostPage;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
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