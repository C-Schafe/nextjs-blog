import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import axios, { AxiosResponse } from 'axios';

type Props = {

}

const SignUpPage:NextPage<Props> = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmedPassword: ''
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    confirmedPassword: []
  })
  const onSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('提交注册信息');
    axios.post(
      'http://localhost:3001/api/signUp',
      formData
    ).then(() => {
      alert('注册成功！')
    }, (error) => {
      if(error.response) {
        setErrors(error.response.data)
      }
    })
  }, [formData]);
  return (
    <div>
      <h1>注册页面</h1>
      <form onSubmit={onSubmit}>
        <div>
          {errors.username?.length > 0 && <div>{errors.username}</div>}
          <label htmlFor="username">账号</label>
          <input type="text" name="username" onChange={(e) => {
            setFormData({
              ...formData,
              username: e.target.value,
            })
          }}/>
        </div>
        <div>
        {errors.password?.length > 0 && <div>{errors.password}</div>}
          <label htmlFor="password">密码</label>
          <input type="password" name="password" onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }}/>
        </div>
        <div>
        {errors.confirmedPassword?.length > 0 && <div>{errors.confirmedPassword}</div>}
          <label htmlFor="confirmedPassword">确认密码</label>
          <input type="password" name="confirmedPassword" onChange={(e) => {
            setFormData({
              ...formData,
              confirmedPassword: e.target.value,
            })
          }}/>
        </div>
        <button>提交</button>
      </form>
    </div>
  );
}

export default SignUpPage;