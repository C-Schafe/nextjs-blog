import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import axios from 'axios';

const SignInPage: NextPage = () => {
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