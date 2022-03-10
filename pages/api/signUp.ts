import path from 'path';
import { NextApiHandler } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { User } from '../../src/entity/User';
import md5 from 'md5';

const signUp:NextApiHandler = async(request, response) => {
  console.log(request.body);
  const connection = await getDatabaseConnection();
  const { username, password, confirmedPassword} = request.body;
  const newUser = new User();
  newUser.username = username;
  newUser.password = password;
  newUser.confirmedPassword = confirmedPassword;
  await newUser.validate();
  response.setHeader('Content-Type', 'application/json');
  if(newUser.hasErrors()) {
    response.statusCode = 422;
    response.write(JSON.stringify(newUser.getErrors()));
  } else {
    // 通过检查，存储用户信息
    await connection.manager.save(newUser);
    response.write(JSON.stringify(newUser));
    response.statusCode = 200;
  }
  response.end();
}

export default signUp;
