import { NextPage } from "next";
import axios from 'axios';
import { useForm, fieldsOption } from "../hooks/useForm";

const PostNewPage: NextPage = () => {
  const onSubmit = (formData:typeof initFormData) => {
    axios.post(
      'http://localhost:3000/api/posts',
      formData
    ).then(() => {
      alert('提交成功');
      window.location.href = '/posts'
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
    title: '',
    content: '',
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
      <h1>新建博客</h1>
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

export default PostNewPage;