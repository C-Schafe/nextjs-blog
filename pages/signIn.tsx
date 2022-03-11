import qs from 'querystring';
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import axios from 'axios';
import { withSession } from '../lib/withSession';
import { useForm, fieldsOption } from '../hooks/useForm';
import Link from 'next/link';

type Props = {
  loginUser: UserInfo
}

interface UserInfo {
  username: string
  errors: {
    username: string[],
    password: string[]
  }
}

const SignInPage: NextPage<Props> = (props) => {
  const onSubmit = (formData: typeof initFormData) => {
    axios.post(
      'http://localhost:3000/api/sessions',
      formData
    ).then(() => {
      alert('登录成功');
      const returnTo = qs.parse(decodeURIComponent(location.search)).returnTo;
      if (returnTo) {
        location.href = returnTo?.toString();
      }
    }, (error) => {
      setErrors(error.response.data)
    })
  }
  const initFormData = {
    username: '',
    password: '',
  }
  const fields: fieldsOption<typeof initFormData>[] = [
    {
      label: '账号',
      inputType: 'text',
      key: 'username',
    },
    {
      label: '密码',
      inputType: 'password',
      key: 'password',
    }
  ];
  const button = <button>登录</button>
  const { form, setErrors } = useForm(initFormData, onSubmit, fields, button);
  return (
    <div>
      <h1>登录页面</h1>
      {props.loginUser && <div>当前登录的用户为: {props.loginUser.username}</div>}
      {form}
      <br />
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  )
}

export default SignInPage;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
  // @ts-ignore
  const user = context.req.session.get('user') || null;
  return {
    props: {
      loginUser: user,
    }
  }
})