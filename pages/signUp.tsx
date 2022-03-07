import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { useForm, fieldsOption } from '../hooks/useForm';

type Props = {
}

const SignUpPage: NextPage<Props> = (props) => {
  const onSubmit = (formData: typeof initFormData) => {
    console.log('提交注册信息');
    axios.post(
      'http://localhost:3000/api/signUp',
      formData
    ).then(() => {
      alert('注册成功!')
    }, (error) => {
      if (error.response) {
        setErrors(error.response.data)
      }
    })
  }
  const initFormData = {
    username: '',
    password: '',
    confirmedPassword: ''
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
    },
    {
      label: '确认密码',
      inputType: 'password',
      key: 'confirmedPassword',
    }
  ];
  const button = <button>注册</button>
  const { form, setErrors } = useForm(initFormData, onSubmit, fields, button);
  return (
    <div>
      <h1>注册页面</h1>
      <input type="text" defaultValue={'default text'} />
      {form}
    </div>
  );
}

export default SignUpPage;