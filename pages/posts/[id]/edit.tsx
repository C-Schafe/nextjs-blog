import { GetServerSideProps, NextPage } from "next";
import axios from 'axios';
import { useForm, fieldsOption } from "../../../hooks/useForm";
import { getDatabaseConnection } from "../../../lib/getDatabaseConnection";
import { Post } from "../../../src/entity/Post";

type Props = {
  id: string;
  post: Post;
}

const EditPostPage: NextPage<Props> = (props) => {
  const { id, post } = props;
  const onSubmit = (formData:typeof initFormData) => {
    axios.patch(
      `http://localhost:3000/api/posts/${id}`,
      {
        ...formData,
        id
      }
    ).then(() => {
      alert('提交成功');
      window.location.href = `/posts/${id}`;
    }).catch((error) => {
      console.dir(error)
      if(error.response?.status === 401) {
        alert('请先登录');
        window.location.href = `/signIn?${encodeURIComponent(`returnTo=${location.pathname}`)}`
      }
      alert('提交失败，服务器繁忙');
    })
  }
  const initFormData = {
    title: post.title,
    content: post.content,
  }
  const fields:fieldsOption<typeof initFormData>[] = [
    {
      label: '标题',
      inputType: 'text',
      key: 'title',
    },
    {
      label: '内容',
      inputType: 'textarea',
      key: 'content',
    }
  ];
  const button = <button className="submit-button">提交</button>
  const { form } = useForm(initFormData, onSubmit, fields, button);
  return (
    <div className="new-post">
      <h1>编辑博客</h1>
      {form}
      <style jsx global>{`
        .new-post {
          padding: 15px 20px;
        }
        .submit-button {
          position: relative;
          left: 100%;
          transform: translateX(-100%);
        }
      `}</style>
    </div>
  )
}

export default EditPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.params;
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, {where: {id}})
  return {
    props: {
      id,
      post: JSON.parse(JSON.stringify(post)),
    }
  }
}