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
  const button = <button>提交</button>
  const { form } = useForm(initFormData, onSubmit, fields, button);
  return (
    <div>
      <h1>新建博客</h1>
      {form}
    </div>
  )
}

export default PostNewPage;