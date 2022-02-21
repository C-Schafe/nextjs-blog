import path from 'path';
import { NextApiHandler } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { User } from '../../src/entity/User';
import md5 from 'md5';

type ValidateErrors = {
  username: string[],
  password: string[],
  confirmedPassword: string[],
}

const signUp:NextApiHandler = async(request, response) => {
  console.log(request.body);
  // 校验注册信息是否合法，在数据库是否重复
  const { username, password, confirmedPassword} = request.body;
  const errors:ValidateErrors = {
    username: [],
    password: [],
    confirmedPassword: []
  }
  console.log(username, password, confirmedPassword);
  if(username.trim().length < 6) {
    errors.username.push('用户名过短，必须大于等于6个字符');
  }
  if(password.length < 6) {
    errors.password.push('密码过短，必须大于等于6个字符');
  }
  if(password !== confirmedPassword) {
    errors.confirmedPassword.push('密码不匹配');
  }
  // 检查数据库是否有重复用户
  const connection = await getDatabaseConnection();
  const user = await connection.manager.findOne(User, {where: {username}});
  if(user) {
    errors.username.push('用户已存在')
  }
  response.setHeader('Content-Type', 'application/json');
  if(Object.values(errors).find(error => error.length > 0)) {
    response.statusCode = 422;
    response.write(JSON.stringify(errors));
  } else {
    // 通过检查，存储用户信息
    const newUser = new User();
    newUser.username = username;
    newUser.passwordDigest = md5(password);
    connection.manager.save(newUser);
    response.statusCode = 200;
  }
  response.end();
}

export default signUp;
