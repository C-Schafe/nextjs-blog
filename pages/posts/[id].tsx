import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { stringify } from "querystring";
import { getPostsNameList, getPostContent } from '../../lib/posts';

type Props = {
  title: string;
  date: string;
  content: string;
}

const PostPage: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      <article>{props.content}</article>
    </div>
  )
}

export default PostPage;

export const getStaticPaths: GetStaticPaths = async (staticPathsContext) => {
  const namesList = getPostsNameList().map((fileName) => {
    return fileName.replace(/.md$/g, '');
  });
  const paths = namesList.map((name) => {
    return {
      params: { id: name }
    };
  });
  return {
    paths,
    fallback: false // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = (context) => {
  const postName = context.params && context.params.id;
  const postContent = getPostContent(postName as string);
  const { title, date, content } = postContent;
  return {
    props: {
      title,
      date,
      content,
    }
  };
}