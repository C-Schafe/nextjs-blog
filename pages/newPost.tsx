import { NextPage } from "next";
import axios from 'axios';
import { useForm, fieldsOption } from "../hooks/useForm";

const PostNewPage: NextPage = () => {
  const onSubmit = (formData:typeof initFormData) => {
    axios.post(
      'http://localhost:3001/api/posts',
      formData
    )
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
    <div>{form}</div>
  )
}

export default PostNewPage;