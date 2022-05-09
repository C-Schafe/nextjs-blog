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
      '/api/sessions',
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
    <div className='sign-in-page'>
      <h1>登录</h1>
      {form}
      <br />
      <Link href="/">
        <a>返回首页</a>
      </Link>
      <style jsx>{`
        .sign-in-page {
          height: 50vw;
          width: 25vw;
          margin: 0 auto;
        }
      `}</style>
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