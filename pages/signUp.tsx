import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { useForm, fieldsOption } from '../hooks/useForm';
import Link from "next/link";

type Props = {
}

const SignUpPage: NextPage<Props> = (props) => {
  const onSubmit = (formData: typeof initFormData) => {
    axios.post(
      '/api/signUp',
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
    <div className="sign-up-page">
      <h1>注册</h1>
      {form}
      <br />
      <Link href="/">
        <a>返回首页</a>
      </Link>
      <style jsx>{`
        .sign-up-page {
          height: 50vw;
          width: 25vw;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default SignUpPage;