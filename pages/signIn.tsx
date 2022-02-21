import { GetServerSideProps, NextPage } from "next";
import React, { useCallback, useState } from "react";
import axios from 'axios';
import { withSession } from '../lib/withSession';

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
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  })
  const onSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(
      'http://localhost:3001/api/sessions',
      formData
    ).then(() => {
      alert('登录成功');
    }, (error) => {
      console.dir(error)
      setErrors(error.response.data)
    })
  }, [formData])
  return (
    <div>
      <h1>登录页面</h1>
      {props.loginUser && <div>当前登录的用户为: {props.loginUser.username}</div>}
      <form onSubmit={onSubmit}>
        <div>
          {errors.username?.length > 0 && <div>{errors.username.join(',')}</div>}
          <label htmlFor="username">账号</label>
          <input type="text" name="username" onChange={(e) => {
            setFormData({
              ...formData,
              username: e.target.value,
            })
          }} />
        </div>
        <div>
          {errors.password?.length > 0 && <div>{errors.password.join(',')}</div>}
          <label htmlFor="password">密码</label>
          <input type="password" name="username" onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }} />
        </div>
        <button>登录</button>
      </form>
    </div>
  )
}

export default SignInPage;

// @ts-ignore
export const getServerSideProps:GetServerSideProps = withSession(async(context) => {
  // console.log(context.req.session);
  // @ts-ignore
  const user = context.req.session.get('user');
  console.log(user);
  return {
    props: {
      loginUser: user,
    }
  }
})